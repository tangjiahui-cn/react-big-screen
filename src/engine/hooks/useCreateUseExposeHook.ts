/**
 * 创建 handleTrigger 函数
 */
import { useMemo, useEffect } from "react";
import { Engine, getEventId } from "@/engine";
import { useEngineContext } from "@/export/context";

function createUseExposeHook(engine: Engine, componentNodeId: string) {
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
    }, []);
  };
}

export function useCreateUseExposeHook(componentNodeId: string) {
  const { engine } = useEngineContext();
  return useMemo(() => createUseExposeHook(engine, componentNodeId), []);
}
