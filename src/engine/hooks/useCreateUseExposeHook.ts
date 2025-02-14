/**
 * 创建 handleTrigger 函数
 */
import { useMemo } from "react";
import engine from "@/engine";

function createUseExposeHook(componentNodeId: string) {
  return function (exposes: Record<string, (payload: any) => void>) {
    for (const key in exposes) {
      engine.events.on(`${componentNodeId}-${key}`, exposes[key]);
    }
    return () => {
      for (const key in exposes) {
        engine.events.remove(`${componentNodeId}-${key}`, exposes[key]);
      }
    };
  };
}

export function useCreateUseExposeHook(componentNodeId: string) {
  return useMemo(() => createUseExposeHook(componentNodeId), []);
}
