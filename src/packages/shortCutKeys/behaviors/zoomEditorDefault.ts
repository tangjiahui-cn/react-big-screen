/**
 * 缩放到默认编辑器比例
 *
 * @author tangjiahui
 * @date 2025/3/26
 */
import engine from "@/engine";

export function zoomEditorDefault() {
  const config = engine.config.getConfig();
  if (config.scaleDefault === config.scale) {
    return;
  }
  engine.config.setConfig({
    scale: config.scaleDefault,
  });
}
