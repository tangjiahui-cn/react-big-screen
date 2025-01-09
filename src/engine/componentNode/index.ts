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

  // 初始化componentNodes
  public init(componentNodes: ComponentNodeType[]) {
    this.maxLevel = Math.max(...componentNodes.map((componentNode) => componentNode?.level || 1));
    setGlobalState({
      componentNodes,
    });
  }

  // 获取已使用组件列表统计
  public getComponentUsed(): ComponentUsed {
    return this.getAllComponentNodes().reduce((used, currentValue) => {
      const targetUsed = (used[currentValue.cId] ||= { count: 0 });
      targetUsed.count++;
      return used;
    }, {} as ComponentUsed);
  }

  // 获取全部componentNodes
  public getAllComponentNodes(): ComponentNodeType[] {
    return getGlobalState().componentNodes;
  }

  // 获取一个componentNode
  public getComponentNode(id: string): ComponentNodeType | undefined {
    return this.getAllComponentNodes().find((componentNode) => {
      return componentNode.id === id;
    });
  }

  // 更新componentNode（不会触发更新）
  public updateComponentNode(id?: string, extComponentNode?: Partial<ComponentNodeType>) {
    if (!id || !extComponentNode) return;
    const componentNode = this.getComponentNode(id);
    if (componentNode) {
      Object.assign(componentNode, extComponentNode);
    }
  }

  // 删除一个componentNode
  public delComponentNode(id: string) {
    setGlobalState((config) => {
      return {
        componentNodes: config.componentNodes.filter((item) => item.id !== id),
      };
    });
  }

  // 删除多个componentNode
  public delComponentNodes(ids: string) {
    setGlobalState((config) => {
      return {
        componentNodes: config.componentNodes.filter((item) => {
          return !ids.includes(item.id);
        }),
      };
    });
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
    if (!componentNode.name) {
      componentNode.name = component.cName;
    }
    // 如果未指定id，则自动创建一个uuid作为id
    if (!componentNode.id) {
      componentNode.id = createUUID();
    }
    if (!componentNode.level) {
      componentNode.level = ++this.maxLevel;
    }
    return Object.assign(componentNode);
  }

  // 插入一个component到末尾
  public insertComponentNode(componentNode: ComponentNodeType) {
    setGlobalState((state) => {
      return {
        componentNodes: [...state.componentNodes, componentNode],
      };
    });
  }

  // 获取最大层级
  public getMaxLevel(): number {
    return this.maxLevel;
  }
}
