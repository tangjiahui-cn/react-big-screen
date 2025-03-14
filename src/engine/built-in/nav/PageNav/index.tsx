/**
 * PageNav
 *
 * @author tangjiahui
 * @date 2025/2/27
 */
import { createComponent } from "@/engine/utils";
import { useCurrentPageId, usePages } from "@/engine";
import { useMemo } from "react";
import NavLine from "./components/NavLine";
import { selectPage } from "@/packages/shortCutKeys";
import { pagesToTree, getSelectedKeys } from "./utils";

export default createComponent((props) => {
  const pages = usePages();
  const currentPageId = useCurrentPageId();

  const { tree, treeMap } = useMemo(() => pagesToTree(pages), [pages]);

  // 到达选中页面的页面id结合
  const selectedKeys: string[] = useMemo(
    () => getSelectedKeys(currentPageId, treeMap),
    [currentPageId, treeMap],
  );

  const renderChildren = useMemo(() => {
    return selectedKeys.length ? (
      <NavLine
        list={tree}
        selectedKeys={selectedKeys}
        onSelect={(pageId) => {
          // 相同页面不可选中
          if (pageId === currentPageId) {
            return;
          }
          selectPage(pageId);
        }}
      />
    ) : null;
  }, [selectedKeys, tree]);

  return <div style={{ width: props?.width, height: props?.height }}>{renderChildren}</div>;
});
