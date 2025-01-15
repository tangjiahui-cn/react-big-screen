/**
 * ComponentNode
 *
 * @author tangjiahui
 * @date 2024/1/7
 * @description 数据实例。用于保存组件实例的数据配置。
 */
import {
  getGlobalState,
  setGlobalState,
  type ComponentNodeType,
  ComponentType,
  BaseComponent,
  ComponentUsed,
} from "..";
import { omit } from "lodash-es";
import { createUUID } from "../utils";

type ComponentNodeChangeEventCallback = (options: { payload: ComponentNodeType }) => void;
type ComponentNodeChangeEventUnmount = () => void;

// 默认值
const INIT_COMPONENT: BaseComponent = {
  cId: "",
  cName: "",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

export default class ComponentNode {
  private maxLevel: number = 1; // 最大层级
  private eventMap: Record<string, ComponentNodeChangeEventCallback[]> = {}; // 数据节点变更回调事件 （id => callback）

  // 触发onChange事件
  private notifyChange(componentNode: ComponentNodeType) {
    this.eventMap[componentNode.id]?.forEach?.((cb: ComponentNodeChangeEventCallback) => {
      cb?.({
        payload: componentNode,
      });
    });
  }

  // 注册节点事件变更回调
  public onChange(
    id: string,
    callback: ComponentNodeChangeEventCallback,
  ): ComponentNodeChangeEventUnmount {
    (this.eventMap[id] ||= []).push(callback);
    return () => {
      this.eventMap[id] = this.eventMap[id].filter((cb: ComponentNodeChangeEventCallback) => {
        return cb !== callback;
      });
    };
  }

  // 清空组件数据
  public clear() {
    this.maxLevel = this.getMinLevel();
    setGlobalState({
      componentNodes: [],
    });
  }

  // 获取最大层级
  public getMaxLevel(): number {
    return this.maxLevel;
  }

  // 获取最小层级
  public getMinLevel() {
    return 1;
  }

  // 初始化componentNodes
  public init(componentNodes: ComponentNodeType[] = []) {
    this.maxLevel = componentNodes.reduce((maxValue, current) => {
      return Math.max(maxValue, current?.level || 1);
    }, 1);
    setGlobalState({
      componentNodes,
    });
  }

  // 新增 componentNode
  public add(componentNode: ComponentNodeType | ComponentNodeType[]) {
    const componentNodes: ComponentNodeType[] = (
      Array.isArray(componentNode) ? componentNode : [componentNode]
    ).reduce((list, current) => {
      if (current) {
        this.maxLevel = Math.max(this.maxLevel, current?.level || 1);
        list.push(current);
      }
      return list;
    }, [] as ComponentNodeType[]);
    setGlobalState((state) => {
      return {
        componentNodes: [...state.componentNodes, ...componentNodes],
      };
    });
  }

  // 获取已使用组件列表统计
  public getComponentUsed(): ComponentUsed {
    return this.getAll().reduce((used, currentValue) => {
      const targetUsed = (used[currentValue.cId] ||= { count: 0 });
      targetUsed.count++;
      return used;
    }, {} as ComponentUsed);
  }

  // 获取全部componentNodes
  public getAll(): ComponentNodeType[] {
    return getGlobalState().componentNodes;
  }

  // 获取一个componentNode
  public get(id: string): ComponentNodeType | undefined {
    return this.getAll().find((componentNode) => {
      return componentNode.id === id;
    });
  }

  /**
   * 更新componentNode（触发局部更新）
   * @param id 待更新实例id
   * @param extComponentNode 合并更新项
   * @param options 额外配置项
   */
  public update(
    id?: string,
    extComponentNode?: Partial<ComponentNodeType>,
    options?: {
      silent?: boolean; // 是否不触发更新，而仅仅是修改值。（默认false，true不触发，false触发）
    },
  ) {
    if (!id || !extComponentNode) return;
    const componentNode = this.get(id);
    if (componentNode) {
      Object.assign(componentNode, extComponentNode);
      if (!options?.silent) {
        this.notifyChange(componentNode);
      }
    }
  }

  // 批量更新componentNode
  public updateSome(extComponentNodes: ComponentNodeType[]) {
    extComponentNodes.forEach((extComponentNode) => {
      const componentNode = this.get(extComponentNode.id);
      if (componentNode) {
        Object.assign(componentNode, extComponentNode);
        this.notifyChange(componentNode);
      }
    });
  }

  // 删除 componentNode
  public delete(id: string | string[]) {
    const ids: string[] = Array.isArray(id) ? id : [id];
    setGlobalState((config) => {
      return {
        componentNodes: config.componentNodes.filter((item) => {
          return !ids.includes(item.id);
        }),
      };
    });
  }

  // 从实例数据创建新的数据实例
  public createFromComponentNode(
    originComponentNode: ComponentNodeType,
    extComponentNode?: Partial<ComponentNodeType>,
  ): ComponentNodeType {
    const { x = 0, y = 0 } = originComponentNode || {};
    const componentNode: ComponentNodeType = {
      ...originComponentNode,
      ...extComponentNode,
      x: x + 10,
      y: y + 10,
    };
    // 如果未指定id，则自动创建一个uuid作为id
    if (!extComponentNode?.id) {
      componentNode.id = createUUID();
    }
    // 如果未指定层级，则自动取最大层级
    if (!componentNode?.level) {
      componentNode.level = ++this.maxLevel;
    }
    // 计算最大层级
    this.maxLevel = Math.max(this.maxLevel, componentNode.level);
    return componentNode;
  }

  // 从组件模板创建数据实例
  public createFromComponent(
    component: ComponentType,
    extComponentNode?: Partial<ComponentNodeType>,
  ): ComponentNodeType {
    const componentNode: ComponentNodeType = {
      ...INIT_COMPONENT, // 基础默认组件数据
      ...omit(component, ["icon", "component"]), // 自定义组件默认数据
      ...extComponentNode, // 扩展组件数据
    } as ComponentNodeType;

    // 如果name不存在，则设置component的name作为默认值
    if (!componentNode?.name) {
      componentNode.name = component.cName;
    }
    // 如果未指定id，则自动创建一个uuid作为id
    if (!componentNode?.id) {
      componentNode.id = createUUID();
    }
    // 如果未指定层级，则自动取最大层级
    if (!componentNode?.level) {
      componentNode.level = ++this.maxLevel;
    }

    // 计算最大层级
    this.maxLevel = Math.max(this.maxLevel, componentNode.level);
    return componentNode;
  }
}
