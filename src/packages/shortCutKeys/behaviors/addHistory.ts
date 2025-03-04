/**
 * 增加历史记录
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import engine, { JsonType } from "@/engine";
import { cloneDeep } from "lodash-es";

export function addHistory(json: JsonType, description: string) {
  const cloned = cloneDeep(json);
  engine.history.add(cloned, description);
}
