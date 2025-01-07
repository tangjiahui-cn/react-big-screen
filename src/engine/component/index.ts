/**
 * 组件模板
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理所有的组件。
 */

import { getGlobalState, setGlobalState, ComponentMap } from '../store';
import { ComponentType } from '../types';

export default class Component {
  // 注册一个组件（注意：每调用一次更新一次全局变量，注册多个请使用 registerComponents）
  public registerComponent(component: ComponentType) {
    setGlobalState((config) => {
      return {
        componentMap: {
          ...config.componentMap,
          [component.cId]: component,
        },
      };
    });
  }

  // 注册多个组件
  public registerComponents(components: ComponentType[]) {
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
  public unregisterComponent(cId: string) {
    setGlobalState((config) => {
      delete config.componentMap[cId];
      return {
        componentMap: config.componentMap,
      };
    });
  }

  // 卸载组件
  public unregisterComponents(cIds: string[]) {
    setGlobalState((config) => {
      cIds.forEach((cId) => {
        delete config.componentMap[cId];
      });
      return {
        componentMap: config.componentMap,
      };
    });
  }

  // 获取已注册组件列表
  public getComponents(): ComponentType[] {
    return Object.values(getGlobalState().componentMap);
  }

  // 获取一个组件模板
  public getComponent(cId: string): ComponentType | undefined {
    return getGlobalState().componentMap[cId];
  }
}
