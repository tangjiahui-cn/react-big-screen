/**
 * 创建 handleTrigger 函数
 */
import { useMemo, useEffect } from "react";
import engine, { getEventId } from "@/engine";

function createUseExposeHook(componentNodeId: string) {
  return function (exposes: Record<string, (payload: any) => void>) {
    useEffect(() => {
      for (const key in exposes) {
        engine.events.on(getEventId(componentNodeId, key), exposes[key]);
      }
      return () => {
        for (const key in exposes) {
          engine.events.remove(getEventId(componentNodeId, key), exposes[key]);
        }
      };
    });
  };
}

export function useCreateUseExposeHook(componentNodeId: string) {
  return useMemo(() => createUseExposeHook(componentNodeId), []);
}
