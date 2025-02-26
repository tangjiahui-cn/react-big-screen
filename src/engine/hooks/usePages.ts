/**
 * usePages
 *
 * @author tangjiahui
 * @date 2025/2/26
 * @description 监听 pages 变化
 */
import engine, { JsonTypePage } from "@/engine";
import { useEffect, useState } from "react";

export function usePages(): JsonTypePage[] {
  const [pages, setPages] = useState<JsonTypePage[]>([]);

  useEffect(() => {
    const initial = engine.page.getAll();
    if (initial.length) setPages(initial);
    return engine.page.onChange((pages) => {
      setPages([...pages]);
    });
  }, []);

  return pages;
}
