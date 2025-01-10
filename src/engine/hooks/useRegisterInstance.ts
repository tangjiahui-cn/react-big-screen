/**
 * useRegisterInstance
 *
 * @author tangjiahui
 * @date 2025/1/7
 */
import { useEffect, useMemo } from "react";
import engine, { InstanceType } from "..";

export function useRegisterInstance(instance: InstanceType): InstanceType {
  const initInstance: InstanceType = useMemo(() => instance, []);

  useEffect(() => {
    engine.instance.add(initInstance);
    return () => {
      engine.instance.delete(initInstance.id);
    };
  }, []);

  return initInstance;
}
