/**
 * 创建编辑器右键菜单项
 *
 * @author tangjiahui
 * @date 2025/3/19
 */
import {
  BorderBottomOutlined,
  BorderOuterOutlined,
  ClearOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  clearComponentNodes,
  saveLocal,
  selectAllComponentNodes,
  unSelectAllComponentNodes,
} from "@/packages/shortCutKeys";
import { createContextMenu, ContextMenuItem } from "@/packages/contextMenu";

const INIT_CONTEXT_MENU: ContextMenuItem[] = [
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

export function createEditorContextMenu(e: MouseEvent): Unmount | undefined {
  return createContextMenu(e.clientX, e.clientY, INIT_CONTEXT_MENU);
}
