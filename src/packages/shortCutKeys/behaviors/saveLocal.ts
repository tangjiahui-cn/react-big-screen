/**
 * 保存到本地
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { message } from "antd";
import { RbsEngine } from "@/export";

/**
 * 保存本地
 * @param silent 是否静默（默认false。true无消息提示，false有消息提示）
 */
export function saveLocal(silent?: boolean) {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;

  engine.getJSON().then((json) => {
    localStorage.setItem("json", JSON.stringify(json));
  });
  if (!silent) {
    message.success("保存成功");
  }
}
