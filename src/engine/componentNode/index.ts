/**
 * ComponentNode
 *
 * @author tangjiahui
 * @date 2024/1/7
 * @description 数据实例。用于保存组件实例的数据配置。
 */
import { getGlobalState, setGlobalState, type ComponentNodeType, ComponentType } from '..';
import { omit } from 'lodash-es';
import { createUUID } from '../utils';

export default class ComponentNode {
  // 初始化componentNodes
  public init(componentNodes: ComponentNodeType[]) {
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
      omit(component, ['icon', 'component']),
      extComponentNode,
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
}
