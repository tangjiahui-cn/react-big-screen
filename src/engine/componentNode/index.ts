/**
 * ComponentNode
 *
 * @author tangjiahui
 * @date 2024/1/7
 * @description 数据实例。用于保存组件实例的数据配置。
 */
import { getGlobalState, setGlobalState, type ComponentNodeType } from '..';

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
}
