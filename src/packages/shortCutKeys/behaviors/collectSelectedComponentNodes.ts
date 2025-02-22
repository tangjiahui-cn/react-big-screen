/**
 * 收藏选中实例数据
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import { getAllSelectedComponentNodes } from ".";
import engine, { createUUID } from "@/engine";
import { message } from "antd";
import dayjs from "dayjs";

export function collectSelectedComponentNodes() {
  const allSelectedComponentNodes = getAllSelectedComponentNodes();
  if (!allSelectedComponentNodes.length) {
    message.warn("收藏组件不能为空");
    return;
  }
  const id = createUUID();
  engine.favorites.add({
    id,
    name: `我的收藏-${id}`,
    children: allSelectedComponentNodes,
    gmtCreate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
}
