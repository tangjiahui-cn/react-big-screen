import { NavItemType } from "../components/NavLine";
import { JsonTypePage } from "@/engine";

// 获取到达选中页面每层的key
export function getSelectedKeys(value: string, treeMap: Record<string, NavItemType>): string[] {
  const list: string[] = [];
  let NavItemType: NavItemType | undefined = treeMap[value];
  while (NavItemType) {
    list.push(NavItemType?.value);
    NavItemType = NavItemType?.parent ? treeMap[NavItemType?.parent] : undefined;
  }
  return list.reverse();
}

// 平铺列表 转 树
export function pagesToTree(
  pages: JsonTypePage[],
  treeMap: Record<string, NavItemType> = {},
): {
  tree: NavItemType[];
  treeMap: Record<string, NavItemType>;
} {
  const tree: NavItemType[] = [];
  pages.forEach((page) => {
    const current = treeMap[page.id];
    const NavItemType: NavItemType = (treeMap[page.id] = {
      value: current?.value || page.id,
      label: current?.label || page.name,
      parent: current?.parent || page?.parentId,
      children: current?.children || [],
    });
    // 非顶层则在父节点添加当前节点
    if (page?.parentId) {
      (treeMap[page.parentId] ||= {
        value: page.parentId,
        parent: "",
        label: "",
        children: [],
      }).children?.push?.(NavItemType);
      return;
    }
    // 顶层直接添加
    tree.push(NavItemType);
  });
  return { tree, treeMap };
}
