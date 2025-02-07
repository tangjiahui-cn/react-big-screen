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
  ComponentNodeGroup,
} from "..";
import { omit } from "lodash-es";
import { createUUID } from "../utils";
import { RectCoordinate } from "@/utils";

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
  category: "base",
};

export default class ComponentNode {
  private maxLevel: number = 1; // 最大层级
  private eventMap: Record<string, ComponentNodeChangeEventCallback[]> = {}; // 数据节点变更回调事件 （id => callback）
  private groupMap: Record<string, ComponentNodeGroup> = {};

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

  // 管道化处理componentNodes
  private pipeComponentNodes(componentNodes: ComponentNodeType[]): ComponentNodeType[] {
    componentNodes.forEach((componentNode) => {
      // 成组（group）
      if (componentNode.group) {
        this.insertGroup(componentNode.group, componentNode.id);
      }
      // 计算 maxLevel
      this.maxLevel = Math.max(this.maxLevel, componentNode?.level || 1);
    });
    return componentNodes;
  }

  // 初始化componentNodes
  public init(componentNodes: ComponentNodeType[] = []) {
    this.maxLevel = 1;
    this.groupMap = {};
    setGlobalState({
      componentNodes: this.pipeComponentNodes(componentNodes),
    });
  }

  // 新增 componentNode
  public add(componentNode: ComponentNodeType | ComponentNodeType[]) {
    const list = Array.isArray(componentNode) ? componentNode : [componentNode];
    setGlobalState((state) => {
      return {
        componentNodes: [...state.componentNodes, ...this.pipeComponentNodes(list)],
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
  public get(id?: string): ComponentNodeType | undefined {
    if (!id) return undefined;
    return this.getAll().find((componentNode) => {
      return componentNode.id === id;
    });
  }

  /**
   * 更新componentNode（默认触发局部更新）
   *
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
    const componentNodes = getGlobalState().componentNodes.filter((componentNode) => {
      return !ids.includes(componentNode.id);
    });
    this.init(componentNodes);
  }

  // 计算一个componentNode的矩形坐标
  public getCoordinate(id?: string | ComponentNodeType): RectCoordinate {
    const componentNode = typeof id === "string" ? this.get(id) : id;
    const rectCoordinate = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    if (componentNode) {
      rectCoordinate.x1 = componentNode.x;
      rectCoordinate.y1 = componentNode.y;
      rectCoordinate.x2 = componentNode.x + componentNode.width;
      rectCoordinate.y2 = componentNode.y + componentNode.height;
    }
    return rectCoordinate;
  }

  // 从实例数据创建新的数据实例
  public createFromComponentNode(
    originComponentNode: ComponentNodeType,
    extComponentNode?: Partial<ComponentNodeType>,
  ): ComponentNodeType {
    const componentNode: ComponentNodeType = {
      ...originComponentNode,
      ...extComponentNode,
    };
    // 如果未指定id，则自动创建一个uuid作为id
    if (!extComponentNode?.id) {
      componentNode.id = createUUID();
    }
    // 如果未指定层级，则自动取最大层级
    if (!componentNode?.level) {
      componentNode.level = ++this.maxLevel;
    }
    // 如果无分类，分配 unknown
    if (!componentNode.category) {
      componentNode.category = "unknown";
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
      ...omit(component, ["icon", "component", "attributesComponent"]), // 自定义组件默认数据
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
    // 如果未指定x，则自动取x
    if (!componentNode.x) {
      componentNode.x = 0;
    }
    // 如果未指定y，则自动取y
    if (!componentNode.y) {
      componentNode.y = 0;
    }
    // 如果无分类，分配 unknown
    if (!componentNode.category) {
      componentNode.category = "unknown";
    }
    // 计算最大层级
    this.maxLevel = Math.max(this.maxLevel, componentNode.level);
    return componentNode;
  }

  /************************* 成组 (group) *************************/
  // 创建一个组
  public createGroup(componentNodes: ComponentNodeType[], groupId: string = createUUID()) {
    const ids: Set<string> = new Set();
    componentNodes.forEach((componentNode) => {
      ids.add(componentNode.id);
      this.update(componentNode.id, {
        group: groupId,
      });
    });
    this.groupMap[groupId] = {
      children: ids,
    };
  }

  // 解散一个/多个组
  public unlinkGroup(groupId: string | string[]) {
    const groupIds: string[] = Array.isArray(groupId) ? groupId : [groupId];
    // 从group中移除全部元素，并删除componentNode的group字段
    groupIds.forEach((groupId: string) => {
      const group = this.groupMap[groupId];
      group.children.forEach((id: string) => {
        this.update(id, {
          group: undefined,
        });
      });
      delete this.groupMap[groupId];
    });
  }

  // 从一个组中删除一个实例id
  public unlinkFromGroup(groupId: string, id: string) {
    const group = this.groupMap[groupId];
    if (groupId) {
      group.children.delete(id);
      // 如果组为空，则删除这个组
      if (!group.children.size) {
        delete this.groupMap[groupId];
      }
    }
  }

  // 插入一个实例id到group中
  public insertGroup(groupId: string, id: string) {
    (this.groupMap[groupId] ||= { children: new Set() }).children.add(id);
  }

  // 获取一个组
  public getGroup(groupId?: string): ComponentNodeGroup | undefined {
    return groupId ? this.groupMap[groupId] : undefined;
  }

  // 获取一个组包含的实例id列表
  public getGroupComponentNodeIds(groupId?: string): string[] {
    return Array.from(this.getGroup(groupId)?.children || []);
  }

  /************************* 布局 (layout) *************************/
  /**
   * 从layout中移除
   * @param source id 或 componentNode
   * @param auto 是否自动修改source（默认false不修改）
   */
  public removeFromLayout(source: string | ComponentNodeType, auto?: boolean) {
    // 原componentNode
    const sourceComponentNode = typeof source === "string" ? this.get(source) : source;
    // 原layout
    const lastParentComponentNode = this.get(sourceComponentNode?.parentId);
    // 从原layout中移除
    if (lastParentComponentNode) {
      this.update(sourceComponentNode?.parentId, {
        childrenIds: lastParentComponentNode?.childrenIds?.filter(
          (id) => id !== sourceComponentNode?.id,
        ),
      });
    }

    if (auto) {
      this.update(sourceComponentNode?.id, {
        parentId: undefined,
      });
    }
  }

  /**
   * 插入layout
   * @param source id 或 componentNode
   * @param targetLayout id 或 componentNode
   */
  public insertLayout(
    source: string | ComponentNodeType,
    targetLayout: string | ComponentNodeType,
  ) {
    // 原componentNode
    const sourceComponentNode = typeof source === "string" ? this.get(source) : source;

    if (!sourceComponentNode) {
      return;
    }

    // 原layout
    const lastParentComponentNode = this.get(sourceComponentNode?.parentId);
    // 从原layout中移除
    if (lastParentComponentNode) {
      this.update(sourceComponentNode?.parentId, {
        childrenIds: lastParentComponentNode?.childrenIds?.filter(
          (id) => id !== sourceComponentNode?.id,
        ),
      });
    }

    // 移入新的layout
    const targetComponentNode =
      typeof targetLayout === "string" ? this.get(targetLayout) : targetLayout;
    if (targetComponentNode) {
      this.update(sourceComponentNode?.id, {
        parentId: targetComponentNode.id,
      });
      this.update(targetComponentNode.id, {
        childrenIds: [...(targetComponentNode?.childrenIds || []), sourceComponentNode?.id],
      });
    }
  }
}
