/**
 * 保存到本地
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import engine from "@/engine";
import { message } from "antd";

/**
 * 保存本地
 * @param silent 是否静默（默认false。true无消息提示，false有消息提示）
 */
export function saveLocal(silent?: boolean) {
  localStorage.setItem("json", JSON.stringify(engine.getJSON()));
  if (!silent) {
    message.success("保存成功");
  }
}
