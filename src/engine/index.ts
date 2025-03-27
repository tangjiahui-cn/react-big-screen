/**
 * 大屏 api
 *
 * @author tangjiahui
 * @date 2024/1/7
 *
 * 核心:
 *     编辑json + 交互逻辑。
 * 理念：
 *     数据与逻辑分离
 *
 * 流程：
 * （1）读取 json 中的 “componentNodes”、或通过 “component模板” 创建 “componentNode数据实例”。
 * （2）“componentNode数据实例” 渲染到画布时，注册 “instance运行时行为实例”。
 *
 * 定义：
 * （1）component：组件模板。用于创建一个 componentNode，仅仅作为模板使用。
 * （2）componentNode：组件可持久化数据实例。用于保存组件的数据配置，导出时会被保存。
 * （3）instance：组件运行时行为实例。用于控制运行时组件的行为，例如：鼠标经过、选中效果。
 * （4）实例：componentNode 和 instance 之和，即数据与行为的集合体。
 *
 * 关于：
 * （1）为什么要分离组件数据实例、行为实例，而不使用一个实例合并了全部？
 * 答：区分可持久化数据、运行时函数，职责分工避免混淆，并避免保存时分离两者所造成的性能损耗。
 */
import Component from "./component";
import Instance from "./instance";
import ComponentNode from "./componentNode";
import Config from "./config";
import Favorites from "./favorites";
import Page, { DEFAULT_PAGE } from "./page";
import { JsonType } from "./types";
import { defaultPackage } from "./built-in";
import { BaseEvent } from "./model";
import { changeLanguage } from "@/i18n";
import { HistoryRecord } from "@/packages/historyRecord";
import { INIT_CONFIG } from "@/engine/store";

export type * from "./types";
export * from "./store";
export * from "./hooks";
export * from "./enum";
export * from "./utils";

type JsonListener = (json: JsonType) => void;
type JsonListenerUnmount = () => void;

class Engine {
  // 载入的json对象
  private json: JsonType | undefined = undefined;
  // json值监听
  private listeners: JsonListener[] = [];
  // setTimeout的id
  private timerId: any;
  // 组件模板
  public component: Component = new Component();
  // 组件数据实例
  public componentNode: ComponentNode = new ComponentNode();
  // 组件行为实例
  public instance: Instance = new Instance();
  // 全局配置
  public config: Config = new Config();
  // 事件
  public events: BaseEvent = new BaseEvent();
  // 收藏夹
  public favorites: Favorites = new Favorites();
  // 子页面管理
  public page: Page = new Page();
  // 历史记录管理
  public history: HistoryRecord = new HistoryRecord();

  constructor() {
    // （初始化时）注册内置组件
    this.registerDefaultPackage();
  }

  // 注册默认package
  private registerDefaultPackage() {
    this.component.initPackages(defaultPackage);
  }

  // 加载json对象
  public loadJSON(json: JsonType) {
    this.json = json;

    if (__DEV__) {
      // 注册内置组件 (解决hmr时，内存注册的components丢失问题)
      this.registerDefaultPackage();
    }

    // 切换语言
    changeLanguage(json?.config?.language || "zh");

    // 设置config
    this.config.setConfig({
      ...INIT_CONFIG,
      ...json?.config,
      currentPageId: json?.config?.currentPageId || DEFAULT_PAGE.id,
    });

    // 注册 local package
    this.component.loadLocalPackages(json?.localPackages);
    // 设置收藏夹
    this.favorites.set(json?.favorites || []);

    // 初始化 pages
    this.page.init(json?.componentNodes, json?.pages);
    // 设置当前展示页 componentNodes
    this.componentNode.set(
      this.page.getComponentNodes(json?.config?.currentPageId || DEFAULT_PAGE.id),
    );

    // 读取默认选中
    if (json.selectedIds) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      // 等待 packages 触发 componentNodes 更新完毕后再选中
      this.timerId = setTimeout(() => {
        this.timerId = undefined;
        this.instance.select(json.selectedIds as string[], true);
      }, 100);
    }

    // 触发json变化
    this.notifyJsonChange();
  }

  // 加载json字符串对象
  public loadJSONString(text?: string | null, callback?: (json: JsonType) => void): void {
    try {
      const json = JSON.parse(text || "{}");
      callback?.(json);
      this.loadJSON(json);
    } catch (e) {
      console.error(e);
    }
  }

  // 获取json对象
  public async getJSON(): Promise<JsonType> {
    this.page.setComponentNodes(this.config.getCurrentPage(), this.componentNode.getAll());
    return {
      used: this.componentNode.getComponentUsed(),
      componentNodes: this.page.getAllComponentNodes(),
      config: this.config.getConfig(),
      selectedIds: this.instance.getAllSelected().map((instance) => instance.id),
      localPackages: await this.component.getAllLocalPackages(),
      favorites: this.favorites.getAll(),
      pages: this.page.getAll(),
    };
  }

  // 清空内容
  public clear() {
    this.loadJSON({
      config: {
        ...INIT_CONFIG,
        ...this.json?.config,
      },
    });
  }

  // json读取触发事件
  private notifyJsonChange() {
    const json = this.json;
    if (json) {
      this.listeners.forEach((callback) => {
        callback(json);
      });
    }
  }

  // 监听json读取
  public onJsonChange(callback: JsonListener): JsonListenerUnmount {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }
}

const engine = new Engine();
export default engine;
