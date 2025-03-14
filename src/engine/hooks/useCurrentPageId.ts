/**
 * useCurrentPageId
 *
 * @author tangjiahui
 * @date 2025/2/27
 * @description 获取当前页id
 */
import { useGlobalSelector } from "@/engine";
import { DEFAULT_PAGE } from "@/engine/page";

export function useCurrentPageId(): string {
  return useGlobalSelector((state) => state?.config?.currentPageId || DEFAULT_PAGE.id);
}
