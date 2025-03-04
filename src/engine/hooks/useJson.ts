/**
 * json变化实例
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import { useEffect, useState } from "react";
import engine, { JsonType } from "..";

export function useJson(): JsonType | undefined {
  const [json, setJson] = useState<JsonType>();

  useEffect(() => {
    engine.getJSON().then((json) => setJson(json));
    return engine.onJsonChange((json) => {
      setJson(json);
    });
  }, []);

  return json;
}
