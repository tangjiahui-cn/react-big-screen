/**
 * 增加历史记录
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import { cloneDeep } from "lodash-es";
import { RbsEngine } from "@/export";

/**
 * 新增一条历史（对当前json拍摄快照）
 * @param description 描述文字
 */
export function addHistory(description: string) {
  setTimeout(async () => {
    const engine = RbsEngine.getActiveEngine();
    if (engine) {
      const json = await engine.getJSON();
      const cloned = cloneDeep(json);
      engine.history.add(cloned, description);
    }
  });
}
