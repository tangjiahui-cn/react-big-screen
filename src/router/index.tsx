/**
 * 路由配置
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { createHashRouter, Navigate } from "react-router-dom";
import React from "react";

function resolve(resolvePromise: () => Promise<any>) {
  const Component = React.lazy(resolvePromise);
  return <Component />;
}

export default createHashRouter([
  {
    path: "/",
    element: <Navigate to={"/create"} replace />,
  },
  {
    path: "/create", // 编辑页面
    element: resolve(() => import("@/pages")),
  },
  {
    path: "/preview", // 预览页面
    element: resolve(() => import("@/pages/preview")),
  },
  {
    path: "*",
    element: <div>404 not found</div>,
  },
]);
