/**
 * useSelectedInstances
 *
 * @author tangjiahui
 * @date 2025/1/14
 * @description 监听选中实例变化
 */
import { useEffect, useState } from "react";
import engine, { InstanceType } from "@/engine";

function getInitial() {
  return engine.instance.getAllSelected();
}

export function useSelectedInstances(): InstanceType[] {
  const [selectedInstances, setSelectedInstances] = useState<InstanceType[]>(getInitial);

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
