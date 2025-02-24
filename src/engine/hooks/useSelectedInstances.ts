/**
 * useSelectedInstances
 *
 * @author tangjiahui
 * @date 2025/1/14
 * @description 监听选中实例变化
 */
import { useEffect, useState } from "react";
import engine, { InstanceType } from "@/engine";

export function useSelectedInstances(): InstanceType[] {
  const [selectedInstances, setSelectedInstances] = useState<InstanceType[]>([]);

  useEffect(() => {
    // 默认选中，则立即设置一次
    const insList = engine.instance.getAllSelected();
    if (insList.length) {
      setSelectedInstances(insList);
    }
    return engine.instance.onSelectedChange((instances) => {
      setSelectedInstances(Object.values(instances));
    });
  }, []);

  return selectedInstances;
}
