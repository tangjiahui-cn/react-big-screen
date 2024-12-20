/**
 * useEffectOnce
 *
 * @author tangjiahui
 * @date 2024/12/20
 * @description run only while mount.
 */
import { EffectCallback, useEffect, useRef } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  const isFirstRef = useRef(true);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return effect();
    }
  }, []);
}
