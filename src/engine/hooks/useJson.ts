/**
 * json变化实例
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import { useEffect, useState } from "react";
import { JsonType } from "..";
import { useEngineContext } from "@/export/context";

export function useJson(): JsonType | undefined {
  const [json, setJson] = useState<JsonType>();
  const { engine } = useEngineContext();

  useEffect(() => {
    engine.getJSON().then((json) => setJson(json));
    return engine.onJsonChange((json) => {
      setJson(json);
    });
  }, []);

  return json;
}
