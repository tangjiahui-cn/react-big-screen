/**
 * 清空所有实例
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { RbsEngine } from "@/export";

export function clearComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  engine?.componentNode?.clear?.();
}
