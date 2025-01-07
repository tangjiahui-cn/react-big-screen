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
} from '..';
import { omit } from 'lodash-es';
import { createUUID } from '../utils';

// 默认值
const INIT_COMPONENT: BaseComponent = {
  cId: '',
  cName: '',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  level: 1,
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

  // 获取全部componentNodes
  public getAllComponentNodes(): ComponentNodeType[] {
    return getGlobalState().componentNodes;
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
    const componentNode: ComponentNodeType = Object.assign(
      {},
      INIT_COMPONENT, // 基础默认组件数据
      omit(component, ['icon', 'component']), // 自定义组件默认数据
      extComponentNode, // 扩展组件数据
    ) as ComponentNodeType;
    // 如果name不存在，则设置component的name作为默认值
    if (!componentNode.name) {
      componentNode.name = component.cName;
    }
    // 如果未指定id，则自动创建一个uuid作为id
    if (!componentNode.id) {
      componentNode.id = createUUID();
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
