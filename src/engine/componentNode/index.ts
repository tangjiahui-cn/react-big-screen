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
  category: "unknown",
};

export default class ComponentNode {
  private maxLevel: number = 1; // 最大层级
  private eventMap: Record<string, ComponentNodeChangeEventCallback[]> = {}; // 数据节点变更回调事件 （id => callback）
  private groupMap: Record<string, ComponentNodeGroup> = {}; // 成组映射（groupId => 对应元素）
  private panelMap: Record<
    string,
    {
      parentId: string; // 父组件id
      children: Set<string>; // 包含子组件id
    }
  > = {}; // 面板映射（panelId => {children: [id, id, ...]}）

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

  /**
   * 管道化处理componentNodes
   * @param componentNodes 要通过的componentNodes
   */
  private pipeComponentNodes(componentNodes: ComponentNodeType[]): ComponentNodeType[] {
    componentNodes.forEach((componentNode) => {
      // 成组（group）
      if (componentNode.groupId) {
        this.insertGroup(componentNode.groupId, componentNode.id);
      }
      // 后增的show属性，如果为undefined则手动设置true
      componentNode.show ??= true;
      // 如果属于一个layout
      if (componentNode.panelId) {
        (this.panelMap[componentNode.panelId] ||= {
          parentId: "",
          children: new Set(),
        }).children.add(componentNode.id);
      }
      // 如果是layout组件，则注册
      if (componentNode.panels) {
        componentNode.panels.forEach((panel) => {
          const currentPanel = (this.panelMap[`${panel.value}`] ||= {
            parentId: componentNode.id,
            children: new Set(),
          });
          currentPanel.parentId = componentNode.id;
        });
      }
      // 计算 maxLevel
      this.maxLevel = Math.max(this.maxLevel, componentNode?.level || 1);
    });
    return componentNodes;
  }

  /**
   * 初始化componentNodes
   * @param componentNodes 要设置的 componentNodes
   * @param init 是否是初始化操作
   */
  public init(componentNodes: ComponentNodeType[] = []) {
    this.maxLevel = 1;
    this.groupMap = {};
    this.panelMap = {};
    setGlobalState({
      componentNodes: this.pipeComponentNodes(componentNodes),
    });
  }

  // 刷新
  public refresh() {
    setGlobalState((config) => {
      return {
        componentNodes: [...config.componentNodes],
      };
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
  public get(id?: string | ComponentNodeType): ComponentNodeType | undefined {
    if (!id) return undefined;
    if (typeof id !== "string") return id;
    return this.getAll().find((componentNode) => {
      return componentNode.id === id;
    });
  }

  // 获取一些componentNode
  public getSome(
    id?: string | ComponentNodeType | (string | ComponentNodeType)[],
  ): ComponentNodeType[] {
    const list = Array.isArray(id) ? id : [id];
    return list.reduce((result, current) => {
      const componentNode = typeof current === "string" ? this.get(current) : current;
      if (componentNode) {
        result.push(componentNode);
      }
      return result;
    }, [] as ComponentNodeType[]);
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
    extComponentNode?:
      | Partial<ComponentNodeType>
      | ((origin: ComponentNodeType) => Partial<ComponentNodeType>),
    options?: {
      silent?: boolean; // 是否不触发更新，而仅仅是修改值。（默认false，true不触发，false触发）
    },
  ) {
    if (!id || !extComponentNode) return;
    const componentNode = this.get(id);
    if (componentNode) {
      Object.assign(
        componentNode,
        typeof extComponentNode === "function" ? extComponentNode(componentNode) : extComponentNode,
      );
      if (!options?.silent) {
        this.notifyChange(componentNode);
      }
    }
  }

  // 删除 componentNode
  public delete(id: string | ComponentNodeType | (string | ComponentNodeType)[]) {
    const list: (string | ComponentNodeType)[] = Array.isArray(id) ? id : [id];
    const deleteIds = new Set<string>();

    list.forEach((item) => {
      const componentNode = this.get(item);
      if (!componentNode) {
        return;
      }
      deleteIds.add(componentNode.id);
      // 如果是layout组件，则删除所有子组件
      if (componentNode?.panels?.length) {
        this.getLayoutChildrenIds(componentNode.id).forEach((childId) => {
          deleteIds.add(childId);
        });
      }
    });

    const componentNodes = getGlobalState().componentNodes.filter((componentNode) => {
      return !deleteIds.has(componentNode.id);
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
      ...omit(component, ["icon", "component", "attributesComponent", "exposes", "triggers"]), // 自定义组件默认数据
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
    // 如果有panels，则赋值value
    if (component.panels) {
      componentNode.panels = component.panels.map((panel) => {
        return {
          label: panel.label,
          value: createUUID(),
        };
      });
      componentNode.currentPanelId = componentNode.panels?.[0]?.value;
    }

    // 设置show
    componentNode.show ??= true;

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
        groupId,
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
          groupId: undefined,
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
  // 获取layout类组件包含的所有组件Ids
  public getLayoutChildrenIds(id?: string): string[] {
    const panels = this.get(id)?.panels;
    if (!panels?.length) return [];
    return panels.reduce((ids, panel) => {
      return ids.concat(Array.from(this.panelMap[panel.value]?.children || []));
    }, [] as string[]);
  }

  // 获取layout类组件包含的所有可展示组件Ids
  public getLayoutVisibleChildrenIds(id?: string): string[] {
    const currentPanelId = this.get(id)?.currentPanelId;
    if (!currentPanelId) return [];
    return Array.from(this.panelMap[currentPanelId]?.children || []);
  }

  // 判断当前组件是否在面板内
  public isInPanel(panelId?: string, source?: string | ComponentNodeType): boolean {
    const sourceComponentNode = typeof source === "string" ? this.get(source) : source;
    if (!panelId || !sourceComponentNode) {
      return false;
    }
    return this.panelMap[panelId]?.children?.has?.(sourceComponentNode.id);
  }

  // 将组件移入面板内
  public insertPanel(panelId: string, source?: string | ComponentNodeType): void {
    const sourceComponentNode = typeof source === "string" ? this.get(source) : source;
    if (!panelId || !sourceComponentNode) {
      return;
    }

    // 从原面板中移除
    this.removeFromPanel(sourceComponentNode, false);

    // 插入panelMap
    const panel = this.panelMap[panelId];
    panel?.children?.add?.(sourceComponentNode.id);

    // 更新componentNode的panelId
    this.update(sourceComponentNode.id, {
      panelId,
    });
  }

  // 将组件移出面板
  public removeFromPanel(
    source?: string | ComponentNodeType, // 原组件
    autoUpdateComponentNode: boolean = true, // 自动更新componentNode
  ): void {
    const sourceComponentNode = typeof source === "string" ? this.get(source) : source;
    const panelId = sourceComponentNode?.panelId;
    if (!panelId || !sourceComponentNode) {
      return;
    }

    // 从panelMap中删除
    const panel = this.panelMap[panelId];
    panel?.children?.delete?.(sourceComponentNode.id);

    if (autoUpdateComponentNode) {
      // 删除componentNode的panelId
      this.update(sourceComponentNode.id, {
        panelId: undefined,
      });
    }
  }

  // 获取面板名称
  public getPanelName(panelId?: string): string {
    if (!panelId) return "";
    const panels = this.get(this.panelMap[panelId]?.parentId)?.panels;
    return panels?.find?.((panel) => panel.value === panelId)?.label || "";
  }

  // 获取面板包含的子组件id（第一层）
  public getPanelChildrenIds(panelId?: string): string[] {
    if (!panelId) return [];
    return Array.from(this.panelMap[panelId]?.children || []);
  }

  // 获取面板包含的子组件
  public getPanelComponentNodes(
    id: string | ComponentNodeType, // 组件id / 组件
    all?: boolean, // 是否添加下属全部子组件（默认 false只取最近一层。可选true）
  ): ComponentNodeType[] {
    const componentNode = this.get(id);
    if (!componentNode) return [];
    return (
      componentNode?.panels?.reduce?.((list, panel) => {
        // 最近一层所有componentNode的id列表
        const panelChildrenIds = this.getPanelChildrenIds(panel.value);
        // 最近一层所有componentNode
        return list.concat(
          panelChildrenIds.reduce((list, id) => {
            const childrenNode = this.get(id);
            if (childrenNode) {
              list.push(childrenNode);
              // 如果子组件也是容器组件，则继续添加其子组件
              if (all && childrenNode.panels?.length) {
                list.push(...this.getPanelComponentNodes(childrenNode, all));
              }
            }
            return list;
          }, [] as ComponentNodeType[]),
        );
      }, [] as ComponentNodeType[]) || []
    );
  }

  // 显示面板下全部组件
  public showPanel(panelId?: string): void {
    if (!panelId) return;
    this.panelMap[panelId]?.children?.forEach?.((id) => {
      this.update(id, {
        show: true,
      });
    });
  }

  // 隐藏面板下全部组件
  public hidePanel(panelId?: string): void {
    if (!panelId) return;
    this.panelMap[panelId]?.children?.forEach?.((id) => {
      this.update(id, {
        show: false,
      });
    });
  }

  // 克隆 componentNodes（会重置父子关系）
  public cloneComponentNodes(
    componentNodes: ComponentNodeType[], // 待克隆组件列表
    options?: {
      // 克隆每一个组件时回调
      onClone?: (old: ComponentNodeType, cloned: ComponentNodeType) => void;
    },
  ): ComponentNodeType[] {
    const panelIdMap = new Map<string, string>(); // panelId映射（旧panelId => 新panelId）
    // 创建新实例
    const newComponentNodes = componentNodes.reduce((list, componentNode) => {
      if (componentNode) {
        // 复制创建新实例
        const newComponentNode = this.createFromComponentNode(componentNode, {
          id: createUUID(),
        });
        // 解除复制组件的成组关系
        delete newComponentNode.groupId;
        // 复制panels
        if (componentNode?.panels) {
          newComponentNode.panels = componentNode.panels.map((panel) => {
            const newPanelId = createUUID();
            if (panel.value === newComponentNode.currentPanelId) {
              newComponentNode.currentPanelId = newPanelId;
            }
            panelIdMap.set(panel.value, newPanelId);
            return {
              ...panel,
              value: newPanelId,
            };
          });
        }
        list.push(newComponentNode);
        options?.onClone?.(componentNode, newComponentNode);
      }
      return list;
    }, [] as ComponentNodeType[]);

    // 重置panelId映射关系
    newComponentNodes.forEach((componentNode) => {
      if (componentNode?.panelId) {
        const newPanelId = panelIdMap.get(componentNode.panelId);
        if (newPanelId) {
          componentNode.panelId = newPanelId;
        }
      }
    });

    return newComponentNodes;
  }
}
