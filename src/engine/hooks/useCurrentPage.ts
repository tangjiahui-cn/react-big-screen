/**
 * useCurrentPage
 *
 * @author tangjiahui
 * @date 2025/2/27
 * @description 获取当前页id
 */
import { useGlobalSelector } from "@/engine";
import { DEFAULT_PAGE } from "@/engine/page";

export function useCurrentPage(): string {
  return useGlobalSelector((state) => state?.config?.currentPage || DEFAULT_PAGE.id);
}
