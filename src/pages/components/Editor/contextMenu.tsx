/**
 * 编辑器面板 - 右键菜单
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { ContextMenuItem } from "@/contextMenu";
import {
  clearComponentNodes,
  saveLocal,
  selectAllComponentNodes,
  unSelectAllComponentNodes,
} from "@/shortCutKeys";
import {
  BorderBottomOutlined,
  BorderOuterOutlined,
  ClearOutlined,
  SaveOutlined,
} from "@ant-design/icons";

export function createEditorContextMenu(): ContextMenuItem[] {
  return [
    {
      key: "selectAll",
      title: "全选",
      icon: <BorderOuterOutlined />,
      onSelect: () => selectAllComponentNodes(),
    },
    {
      key: "unselectAll",
      title: "反选",
      icon: <BorderBottomOutlined />,
      onSelect: () => unSelectAllComponentNodes(),
    },
    {
      key: "clear",
      title: "清空",
      icon: <ClearOutlined />,
      onSelect: () => clearComponentNodes(),
    },
    {
      key: "saveLocal",
      title: "保存",
      icon: <SaveOutlined />,
      onSelect: () => saveLocal(),
    },
  ];
}
