/**
 * 创建组件右键菜单项
 *
 * @author tangjiahui
 * @date 2025/3/19
 */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  LockOutlined,
  StarOutlined,
  UnlockOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  collectSelectedComponentNodes,
  copySelectedComponentNodes,
  deleteSelectedComponentNodes,
  lockAllSelectedComponentNodes,
  selectedGroup,
  selectedLevelDown,
  selectedLevelUp,
  selectedToBottom,
  selectedToTop,
  selectedUnGroup,
  unlockAllSelectedComponentNodes,
} from "@/packages/shortCutKeys";
import engine from "@/engine";
import { createContextMenu, ContextMenuItem } from "@/packages/contextMenu";

const INIT_CONTEXT_MENU: ContextMenuItem[] = [
  {
    key: "top",
    icon: <VerticalAlignTopOutlined />,
    title: "置顶",
    style: { borderTop: "1px solid #e8e8e8" },
    onSelect: () => selectedToTop(),
  },
  {
    key: "bottom",
    icon: <VerticalAlignBottomOutlined />,
    title: "置底",
    onSelect: () => selectedToBottom(),
  },
  {
    key: "levelUp",
    icon: <ArrowUpOutlined />,
    title: "上移一层",
    onSelect: () => selectedLevelUp(),
  },
  {
    key: "levelDown",
    icon: <ArrowDownOutlined />,
    title: "下移一层",
    style: { borderBottom: "1px solid #e8e8e8" },
    onSelect: () => selectedLevelDown(),
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
    key: "group",
    icon: <BlockOutlined />,
    title: "成组",
    onSelect: () => selectedGroup(),
  },
  {
    key: "ungroup",
    icon: <DisconnectOutlined />,
    title: "取消成组",
    onSelect: () => selectedUnGroup(),
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
  {
    key: "collect",
    icon: <StarOutlined />,
    title: "收藏",
    onSelect: () => collectSelectedComponentNodes(),
  },
];

export function createItemContextMenu(e: MouseEvent): Unmount | undefined {
  return createContextMenu(e.clientX, e.clientY, INIT_CONTEXT_MENU, {
    onBeforeOpen(menuItems: ContextMenuItem[]) {
      let lockCount = 0; // 锁定组件数量
      let isHasGroup = false; // 是否存在已成组元素
      const allSelectedInstances = engine.instance.getAllSelected();
      const allSelectedComponents = allSelectedInstances.map((instance) => {
        const componentNode = instance.getComponentNode();
        if (componentNode?.lock) {
          lockCount++;
        }
        if (componentNode.groupId) {
          isHasGroup = true;
        }
        return componentNode;
      });
      // 判断菜单项显隐
      if (allSelectedComponents.length) {
        return menuItems.filter((menuItem: ContextMenuItem) => {
          // 【成组】：存在2个元素及以上。
          if (menuItem.key === "group") return allSelectedInstances.length > 1;
          // 【取消成组】：存在成组元素。
          if (menuItem.key === "ungroup") return isHasGroup;
          // 【锁定】：存在元素未锁定。
          if (menuItem.key === "lock") return lockCount !== allSelectedComponents.length;
          // 【解锁】：存在锁定元素。
          if (menuItem.key === "unlock") return !!lockCount;
          return true;
        });
      }
      return menuItems;
    },
  });
}
