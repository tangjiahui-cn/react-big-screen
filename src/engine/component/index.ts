/**
 * Component
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { getGlobalState, setGlobalState } from '@/engine';

// registered component type.
export interface ComponentType {
  /** unique component id */
  cId: string;
  /** component name */
  name: string;
  /** component icon */
  icon?: string;
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
  getAll(): ComponentType[] {
    return Object.values(getGlobalState().componentMap);
  }
}
