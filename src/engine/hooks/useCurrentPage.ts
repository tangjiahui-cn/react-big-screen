/**
 * useCurrentPage
 *
 * @author tangjiahui
 * @date 2025/2/27
 * @description 获取当前页。
 */
import engine, { JsonTypePage, useCurrentPageId } from "@/engine";
import { useEffect, useState } from "react";

function getCurrentPage() {
  return engine.page.get(engine.config.getCurrentPage());
}

export function useCurrentPage(): JsonTypePage | undefined {
  const currentPageId = useCurrentPageId();
  const [page, setPage] = useState(getCurrentPage);

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
