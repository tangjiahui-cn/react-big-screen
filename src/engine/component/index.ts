/**
 * 组件模板
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理所有的组件。
 */

import { getGlobalState, setGlobalState, ComponentMap } from "../store";
import { type ComponentPackage, ComponentType, JsonTypeLocalPackage } from "../types";
import localforage from "localforage";
import { getUrlText, loadModuleFromText } from "@/utils";

export default class Component {
  // 存储package映射（id => package）
  private pkgMap = new Map<string, ComponentPackage>();
  // 存储package变化回调函数
  private pkgCallbacks: ((packages: ComponentPackage[]) => void)[] = [];
  // localforage实例
  private localforageIns = localforage.createInstance({
    name: "ReactBigScreen_code",
    driver: localforage.INDEXEDDB,
    description: "存储源代码缓存",
    version: 1,
  });

  // 获取已注册组件列表
  public getAll(): ComponentType[] {
    return Object.values(getGlobalState().componentMap);
  }

  // 获取一个组件模板
  public get(cId?: string): ComponentType | undefined;
  public get(cId: string[]): (ComponentType | undefined)[];
  public get(cId?: string | string[]): ComponentType | undefined | (ComponentType | undefined)[] {
    if (!cId) return undefined;
    if (Array.isArray(cId)) {
      return cId.map((value) => this.get(value));
    }
    return getGlobalState().componentMap[cId];
  }

  // 注册组件
  public register(component: ComponentType | ComponentType[]) {
    const components: ComponentType[] = Array.isArray(component) ? component : [component];
    const registerComponentsMap = components.reduce((componentMap, current) => {
      return Object.assign(componentMap, {
        [current.cId]: current,
      });
    }, {} as ComponentMap);
    setGlobalState((config) => {
      return {
        componentMap: {
          ...config.componentMap,
          ...registerComponentsMap,
        },
      };
    });
  }

  // 卸载一个组件
  public unRegister(cId: string | string[] | (string | ComponentType)[]) {
    const cIdList: (string | ComponentType)[] = Array.isArray(cId) ? cId : [cId];
    setGlobalState((config) => {
      cIdList.forEach((item) => {
        const cId = typeof item === "string" ? item : item?.cId;
        delete config.componentMap[cId];
      });
      return {
        componentMap: {
          ...config.componentMap,
        },
      };
    });
  }

  // 卸载全部组件
  public unRegisterAll() {
    setGlobalState({
      componentMap: {},
    });
  }

  /*************************** 远程组件包相关 **************************/
  // 清空packages
  public clearPackages() {
    this.pkgMap = new Map();
    this.unRegisterAll();
  }

  // 初始化packages
  public initPackages(pkgs: ComponentPackage | undefined | (ComponentPackage | undefined)[]) {
    this.clearPackages();
    if (!pkgs) return;
    pkgs = Array.isArray(pkgs) ? pkgs : [pkgs];
    pkgs.forEach((pkg) => {
      if (!pkg) return;
      this.pkgMap.set(pkg.id, pkg);
      this.register(pkg.components);
    });
  }

  // 触发package事件通知
  private notifyPackageChange(): void {
    const pkgList: ComponentPackage[] = this.getAllPackage();
    this.pkgCallbacks.forEach((cb) => cb(pkgList));
  }

  // 获取一个包
  public getPackage(pkg: string | ComponentPackage): ComponentPackage | undefined {
    return typeof pkg === "string" ? this.pkgMap.get(pkg) : pkg;
  }

  // 获取包的模块代码
  public async getPackageSourceCode(pkg: string | ComponentPackage): Promise<string | undefined> {
    const id = typeof pkg === "string" ? pkg : pkg.id;
    return (await this.localforageIns.getItem(id)) ?? undefined;
  }

  // 存储包的模块代码
  public async savePackageSourceCode(pkg: string | ComponentPackage, sourceCode: string) {
    const id = typeof pkg === "string" ? pkg : pkg.id;
    return this.localforageIns.setItem(id, sourceCode);
  }

  /**
   * 获取所有包
   * @param omitSystem 是否排除系统包
   */
  public getAllPackage(omitSystem?: boolean): ComponentPackage[] {
    const packages = Array.from(this.pkgMap.values());
    if (omitSystem) {
      return packages.filter((pkg) => pkg.origin !== "system");
    }
    return packages;
  }

  // 监听package更新
  public onPackageChange(cb: (packages: ComponentPackage[]) => void) {
    this.pkgCallbacks.push(cb);
    return () => {
      this.pkgCallbacks = this.pkgCallbacks.filter((callback) => {
        return callback !== cb;
      });
    };
  }

  // 加载一个包
  public registerPackage(
    pkg: ComponentPackage | (ComponentPackage | undefined)[] | undefined,
  ): void {
    if (!pkg) return;
    const pkgList = Array.isArray(pkg) ? pkg : [pkg];
    pkgList.forEach((pkg) => {
      if (!pkg) return;
      this.pkgMap.set(pkg.id, pkg);
      this.register(pkg.components);
    });
    this.notifyPackageChange();
  }

  // 删除一个包
  public unregisterPackage(pkg: ComponentPackage | ComponentPackage[]): void {
    const pkgList = Array.isArray(pkg) ? pkg : [pkg];
    pkgList.forEach((pkg) => {
      this.pkgMap.delete(pkg.id);
      this.unRegister(pkg.components);
    });
    this.notifyPackageChange();
  }

  // 更新一个包
  public updatePackage(id: string, extPackage?: Partial<ComponentPackage>, silent?: boolean): void {
    if (!extPackage) return;
    const pkg = this.getPackage(id);
    if (!pkg) return;
    Object.assign(pkg, extPackage);
    if (!silent) {
      this.notifyPackageChange();
    }
  }

  // 获取全部本地 package 存储对象
  public async getAllLocalPackages(): Promise<JsonTypeLocalPackage[]> {
    const pmList = this.getAllPackage().reduce((pmList, current) => {
      if (["local", "remote"].includes(current.origin)) {
        pmList.push(this.getLocalPackage(current));
      }
      return pmList;
    }, [] as any[]);
    return Promise.all(pmList).then((list) => list.filter(Boolean));
  }

  // 获取本地 package 存储对象
  public async getLocalPackage(
    id: string | ComponentPackage,
  ): Promise<JsonTypeLocalPackage | undefined> {
    const pkg = this.getPackage(id);
    if (!pkg) return undefined;
    let originData: any;

    if (pkg.origin === "local") {
      originData = await this.getPackageSourceCode(pkg);
    } else if (pkg.origin === "remote") {
      originData = pkg.originData;
    }

    return {
      id: pkg.id,
      origin: pkg.origin,
      originData,
    };
  }

  // 载入本地 package 存储对象
  public async loadLocalPackages(localPackage?: JsonTypeLocalPackage | JsonTypeLocalPackage[]) {
    if (!localPackage) return;
    const list = Array.isArray(localPackage) ? localPackage : [localPackage];
    if (!list.length) return;

    // 所有包含本地源码的一起查询（因为每次注册一个package都会触发更新，所以同时进行注册）
    const localPkgs: JsonTypeLocalPackage[] = [];
    const remotePkgs: JsonTypeLocalPackage[] = [];

    list.forEach((pkg) => {
      if (pkg.origin === "local") {
        pkg.originData && localPkgs.push(pkg);
        return;
      }
      if (pkg.origin === "remote") {
        pkg.originData && remotePkgs.push(pkg);
        return;
      }
    });

    // 注册包含源码的模块
    Promise.all(
      localPkgs.map((pkg) => {
        return loadModuleFromText(pkg.originData);
      }),
    ).then((pkgs) => {
      pkgs.forEach((pkg, index) => {
        const localData = list[index];
        if (pkg) {
          // 赋值origin
          pkg.origin = localData.origin;
          pkg.originData = "";
          // 存储源码到浏览器
          this.savePackageSourceCode(pkg.id, localData.originData);
        }
      });
      this.registerPackage(pkgs);
    });

    // 注册远程模块
    remotePkgs.forEach((remotePkg) => {
      getUrlText(remotePkg.originData).then((text) => {
        loadModuleFromText(text).then((pkg) => {
          if (pkg) {
            // 赋值origin
            pkg.origin = remotePkg.origin;
            pkg.originData = remotePkg.originData;
            // 存储源码到浏览器
            this.savePackageSourceCode(pkg.id, text);
          }
          // 注册package
          this.registerPackage(pkg);
        });
      });
    });
  }
}
