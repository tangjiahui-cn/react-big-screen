/**
 * 删除选中数据
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";

export function deleteSelectedComponentNodes() {
  const selectedInstanceIds: string[] = engine.instance
    .getAllSelected()
    .map((instance) => instance.id);
  engine.componentNode.delete(selectedInstanceIds);
}
