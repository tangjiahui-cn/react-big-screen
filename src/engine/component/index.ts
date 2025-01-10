/**
 * 组件模板
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理所有的组件。
 */

import { getGlobalState, setGlobalState, ComponentMap } from "../store";
import { ComponentType } from "../types";

export default class Component {
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
  public unRegister(cId: string | string[]) {
    const cIds: string[] = Array.isArray(cId) ? cId : [cId];
    setGlobalState((config) => {
      cIds.forEach((cId) => {
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
}
