/**
 * 右键菜单配置项
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import { RenderListItem } from "@/contextMenu";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import engine, { ComponentNodeType } from "@/engine";

/**
 * 创建右键菜单配置项
 * @param componentNode 当前实例数据
 */
export function createContextMenu(componentNode: ComponentNodeType): RenderListItem[] {
  return [
    {
      key: "top",
      icon: <VerticalAlignTopOutlined />,
      title: "置顶",
      style: { borderTop: "1px solid #e8e8e8" },
      onSelect() {
        const maxLevel = engine.componentNode.getMaxLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: maxLevel,
            });
          }
        });
      },
    },
    {
      key: "bottom",
      icon: <VerticalAlignBottomOutlined />,
      title: "置底",
      onSelect() {
        const minLevel = engine.componentNode.getMinLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: minLevel,
            });
          }
        });
      },
    },
    {
      key: "levelUp",
      icon: <ArrowUpOutlined />,
      title: "上移一层",
      onSelect() {
        const maxLevel = engine.componentNode.getMaxLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: Math.min(maxLevel, (componentNode?.level || 0) + 1),
            });
          }
        });
      },
    },
    {
      key: "levelDown",
      icon: <ArrowDownOutlined />,
      title: "下移一层",
      style: { borderBottom: "1px solid #e8e8e8", marginBottom: 4 },
      onSelect() {
        const minLevel = engine.componentNode.getMinLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: Math.max(minLevel, (componentNode?.level || 0) - 1),
            });
          }
        });
      },
    },
    {
      key: "copy",
      icon: <CopyOutlined />,
      title: "复制",
      onSelect() {
        const newComponentNode = engine.componentNode.createFromComponentNode(componentNode);
        engine.componentNode.add(newComponentNode);
        setTimeout(() => {
          engine.instance.select(newComponentNode.id, true); // 选中新实例
        });
      },
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      title: "删除",
      titleStyle: { gap: 6 },
      onSelect() {
        const selectInstanceIds: string[] = engine.instance.getAllSelected().map((ins) => ins.id);
        engine.componentNode.delete(selectInstanceIds);
      },
    },
  ] as RenderListItem[];
}
