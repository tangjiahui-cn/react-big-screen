/**
 * nav （导航组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import React from "react";

export const nav: ComponentType[] = [
  {
    cId: "page-nav",
    cName: "页面导航栏",
    description: "管理所有子页面切换的导航栏。",
    icon: "",
    category: "nav",
    x: 0,
    y: 0,
    width: 300,
    height: 32,
    isAllPage: true,
    component: React.lazy(() => import("./PageNav")),
  },
];
