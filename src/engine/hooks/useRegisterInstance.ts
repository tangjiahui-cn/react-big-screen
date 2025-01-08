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
    engine.instance.registerInstance(initInstance);
    return () => {
      engine.instance.unregisterInstance(initInstance.id);
    };
  }, []);

  return initInstance;
}
