/**
 * Components
 *
 * @author tangjiahui
 * @date 2024/8/20
 */
import builtInComponents from './built-in';
import type { ComponentType } from './types';

export type HookComponentFn = (component: ComponentType) => void;

export default class Component {
  private map: Map<string, ComponentType> = new Map();
  private hookUseComponentCallbacks: HookComponentFn[] = [];

  constructor() {
    builtInComponents.forEach((component: ComponentType) => {
      this.use(component);
    });
  }

  /**
   * register a component.
   *
   * @param component a unique component.
   */
  public use(component: ComponentType) {
    if (!component.id) {
      throw new Error('Invalid component id.');
    }
    if (this.map.has(component.id)) {
      throw new Error(`Component id '${component.id}' is already exist.`);
    }
    this.map.set(component.id, component);
    this.hookUseComponentCallbacks.forEach((fn: HookComponentFn) => fn(component));
  }

  /**
   * get a component by id.
   *
   * @param id component id
   * @return component or undefined
   */
  public get(id: ComponentType['id']): ComponentType | undefined {
    return this.map.get(id);
  }

  /**
   * get a component body by id.
   *
   * @param id component id
   * @return component body or undefined
   */
  public getBody(id: ComponentType['id']): ComponentType['body'] | undefined {
    return this.get(id)?.body;
  }

  /**
   * get all components.
   *
   * @return component list
   */
  public getAll(): ComponentType[] {
    return Array.from(this.map.values());
  }
}
