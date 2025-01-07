/**
 * useRegisterInstance
 *
 * @author tangjiahui
 * @date 2025/1/7
 */
import { useEffect } from 'react';
import engine, { InstanceType } from '..';

export function useRegisterInstance(instance: InstanceType) {
  useEffect(() => {
    engine.instance.registerInstance(instance);
    return () => {
      engine.instance.unregisterInstance(instance.id);
    };
  }, []);
}
