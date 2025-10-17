/**
 * 缩放到默认编辑器比例
 *
 * @author tangjiahui
 * @date 2025/3/26
 */
import { RbsEngine } from "@/export";

export function zoomEditorDefault() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const config = engine.config.getConfig();
  engine.config.setConfig({
    scale: config.scaleDefault,
    editorOffsetX: 0,
    editorOffsetY: 0,
  });
}
