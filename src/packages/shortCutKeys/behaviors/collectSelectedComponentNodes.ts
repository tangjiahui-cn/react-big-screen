/**
 * 收藏选中实例数据
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import { getAllSelectedComponentNodes } from ".";
import { createUUID } from "@/engine";
import { message } from "antd";
import dayjs from "dayjs";
import { RbsEngine } from "@/export";

export function collectSelectedComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const allSelectedComponentNodes = getAllSelectedComponentNodes();
  if (!allSelectedComponentNodes.length) {
    message.warn("收藏组件不能为空");
    return;
  }
  const id = createUUID();
  const totalCount = engine.favorites.getAll().length;
  engine.favorites.add({
    id,
    name: `收藏${totalCount + 1}`,
    children: allSelectedComponentNodes,
    gmtCreate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
}
