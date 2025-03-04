/**
 * 增加历史记录
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import engine from "@/engine";
import { cloneDeep } from "lodash-es";

/**
 * 新增一条历史（对当前json拍摄快照）
 * @param description 描述文字
 * @param json 当前json快照
 */
export function addHistory(description: string) {
  setTimeout(() => {
    engine.getJSON().then((json) => {
      const cloned = cloneDeep(json);
      engine.history.add(cloned, description);
    });
  });
}
