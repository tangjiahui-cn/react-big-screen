/**
 * Component
 *
 * @author tangjiahui
 * @date 2024/12/24
 */
import { componentActions, getGlobalState, globalDispatch } from '@/engine';

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
    globalDispatch(componentActions.registerComponent(component));
  }

  /**
   * register some component.
   * @param componentList target component list.
   */
  registerComponentList(componentList: ComponentType[]) {
    globalDispatch(componentActions.registerComponentList(componentList));
  }

  /**
   * get All registered Components.
   * @return component list.
   */
  getAll(): ComponentType[] {
    return Object.values(getGlobalState().component.componentMap);
  }
}
