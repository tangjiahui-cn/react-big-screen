/**
 * Component
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import React from 'react';
import { getGlobalState, setGlobalState } from '@/engine';

export interface ComponentProps<Option = Record<string, any>> {
  width: number;
  height: number;
  options: Option;
}

// registered component type.
export interface ComponentType<Options = Record<string, any>> {
  /** unique component id */
  cId: string;
  /** component name */
  name: string;
  /** component icon */
  icon?: string;
  /** react function component */
  component: React.FC<ComponentProps<Options>>;
}

export class Component {
  /**
   * register a component.
   * @param component target component.
   */
  registerComponent(component: ComponentType) {
    setGlobalState((state) => ({
      componentMap: {
        ...state.componentMap,
        [component.cId]: component,
      },
    }));
  }

  /**
   * register some component.
   * @param componentList target component list.
   */
  registerComponentList(componentList: ComponentType[]) {
    setGlobalState((state) => ({
      componentMap: {
        ...state.componentMap,
        ...componentList.reduce((result, component) => {
          result[component.cId] = component;
          return result;
        }, {}),
      },
    }));
  }

  /**
   * get All registered Components.
   * @return component list.
   */
  getAllComponents(): ComponentType[] {
    return Object.values(getGlobalState().componentMap);
  }

  /**
   * get a component
   */
  getComponent(cId: string): ComponentType | undefined {
    if (!cId) return;
    return getGlobalState().componentMap[cId];
  }
}
