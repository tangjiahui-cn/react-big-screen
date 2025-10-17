/**
 * useRegisterInstance
 *
 * @author tangjiahui
 * @date 2025/1/7
 */
import { useEffect, useMemo } from "react";
import { InstanceType } from "..";
import { useEngineContext } from "@/export/context";

export function useRegisterInstance(instance: InstanceType): InstanceType {
  const initInstance: InstanceType = useMemo(() => instance, []);
  const { engine } = useEngineContext();

  useEffect(() => {
    engine.instance.add(initInstance);
    return () => {
      engine.instance.delete(initInstance.id);
    };
  }, []);

  return initInstance;
}
