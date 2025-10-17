/**
 * useSelectedInstances
 *
 * @author tangjiahui
 * @date 2025/1/14
 * @description 监听选中实例变化
 */
import { useEffect, useState } from "react";
import { InstanceType } from "@/engine";
import { useEngineContext } from "@/export/context";

export function useSelectedInstances(): InstanceType[] {
  const { engine } = useEngineContext();
  const [selectedInstances, setSelectedInstances] = useState<InstanceType[]>(() => {
    return engine.instance.getAllSelected();
  });

  useEffect(() => {
    return engine.instance.onSelectedChange((instances) => {
      const currentSelectedInstances = Object.values(instances);
      setSelectedInstances((list: InstanceType[]) => {
        // 如果新/旧都未选中实例，则不更新
        if (!currentSelectedInstances.length && !list.length) {
          return list;
        }
        return currentSelectedInstances;
      });
    });
  }, []);

  return selectedInstances;
}
