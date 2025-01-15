/**
 * useEffectOnce
 *
 * @author tangjiahui
 * @date 2024/12/20
 * @description run only while mount.
 */
import { EffectCallback, useEffect } from "react";

export function useEffectOnce(effect: EffectCallback) {
  useEffect(effect, []);
}
