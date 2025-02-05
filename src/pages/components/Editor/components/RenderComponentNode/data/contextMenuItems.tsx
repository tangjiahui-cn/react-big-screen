/**
 * 右键菜单配置项
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import { ContextMenuItem } from "@/packages/contextMenu";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  LockOutlined,
  UnlockOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  copySelectedComponentNodes,
  deleteSelectedComponentNodes,
  selectedGroup,
  lockAllSelectedComponentNodes,
  selectedToBottom,
  selectedToTop,
  selectedUnGroup,
  unlockAllSelectedComponentNodes,
  selectedLevelUp,
  selectedLevelDown,
} from "@/packages/shortCutKeys";

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
  ];
}
