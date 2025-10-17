/**
 * useCurrentPage
 *
 * @author tangjiahui
 * @date 2025/2/27
 * @description 获取当前页。
 */
import { JsonTypePage, useCurrentPageId } from "@/engine";
import { useEffect, useState } from "react";
import { useEngineContext } from "@/export/context";

export function useCurrentPage(): JsonTypePage | undefined {
  const { engine } = useEngineContext();
  const currentPageId = useCurrentPageId();
  const [page, setPage] = useState(getCurrentPage);

  function getCurrentPage() {
    return engine.page.get(engine.config.getCurrentPage());
  }

  useEffect(() => {
    return engine.page.onChange(() => {
      const currentPage = getCurrentPage();
      setPage(currentPage ? { ...currentPage } : undefined);
    });
  }, []);

  // 切换页面时设置一次
  useEffect(() => {
    setPage(getCurrentPage);
  }, [currentPageId]);

  return page;
}
