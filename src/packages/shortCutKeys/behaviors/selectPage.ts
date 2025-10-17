/**
 * selectPage
 *
 * @author tangjiahui
 * @date 2025/2/27
 * @description 选中页面
 */
import { RbsEngine } from "@/export";

export function selectPage(pageId?: string) {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  if (!pageId) {
    console.error("pageId must be required.");
    return;
  }
  const currentPageId = engine.config.getCurrentPage();
  // 保存当前页 componentNodes
  engine.page.setComponentNodes(currentPageId, engine.componentNode.getAll());
  // 设置下一页的 componentNodes
  engine.componentNode.set(engine.page.getComponentNodes(pageId));
  // 设置全局 config
  engine.config.setConfig({ currentPageId: pageId });
}
