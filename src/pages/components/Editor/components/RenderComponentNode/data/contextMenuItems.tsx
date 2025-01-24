/**
 * 右键菜单配置项
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import { ContextMenuItem } from "../../../../../../packages/contextMenu";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import engine from "@/engine";
import {
  copySelectedComponentNodes,
  deleteSelectedComponentNodes,
  lockAllSelectedComponentNodes,
  unlockAllSelectedComponentNodes,
} from "../../../../../../packages/shortCutKeys";

/**
 * 创建右键菜单配置项
 */
export function createContextMenu(): ContextMenuItem[] {
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
      style: { borderBottom: "1px solid #e8e8e8" },
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
      key: "lock",
      icon: <LockOutlined />,
      title: "锁定",
      onSelect: () => lockAllSelectedComponentNodes(),
    },
    {
      key: "unlock",
      icon: <UnlockOutlined />,
      title: "解锁",
      onSelect: () => unlockAllSelectedComponentNodes(),
    },
    {
      key: "copy",
      icon: <CopyOutlined />,
      title: "复制",
      style: { borderTop: "1px solid #e8e8e8" },
      onSelect: () => copySelectedComponentNodes(),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      title: "删除",
      titleStyle: { gap: 6 },
      onSelect: () => deleteSelectedComponentNodes(),
    },
  ];
}
