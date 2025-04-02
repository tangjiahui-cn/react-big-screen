/**
 * 路由相关方法
 *
 * @author tangjiahui
 * @date 2025/1/20
 */

/**
 * 打开路由新页面
 * @param routePath 路由地址
 * @param unique 是否打开唯一页面
 */
export function openRoute(routePath: string, unique: boolean = true) {
  if (!routePath.startsWith("/")) {
    routePath = `/${routePath}`;
  }

  const url = `${window.location.origin}${window.location.pathname}#${routePath}`;
  // 每次打开新窗口
  if (!unique) {
    window.open(url);
    return;
  }

  // 打开唯一页面
  const otherWindow = window.open(url, routePath);
  try {
    const otherURL = otherWindow?.location?.href;
    if (otherURL === url) {
      // 如果地址正确，则刷新该页面
      otherWindow?.location?.reload?.();
    } else {
      console.warn("page url changed.");
    }
  } catch {
    console.warn("page url changed.");
  }
}
