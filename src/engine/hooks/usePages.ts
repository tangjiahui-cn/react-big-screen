/**
 * usePages
 *
 * @author tangjiahui
 * @date 2025/2/26
 * @description 监听 pages 变化
 */
import { JsonTypePage } from "@/engine";
import { useEffect, useState } from "react";
import { useEngineContext } from "@/export/context";

export function usePages(): JsonTypePage[] {
  const [pages, setPages] = useState<JsonTypePage[]>([]);
  const { engine } = useEngineContext();

  useEffect(() => {
    const initial = engine.page.getAll();
    if (initial.length) setPages(initial);
    return engine.page.onChange((pages) => {
      setPages([...pages]);
    });
  }, []);

  return pages;
}
