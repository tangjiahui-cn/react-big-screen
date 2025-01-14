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
    return engine.instance.onSelectedChange((instances) => {
      setSelectedInstances(Object.values(instances));
    });
  }, []);

  return selectedInstances;
}
