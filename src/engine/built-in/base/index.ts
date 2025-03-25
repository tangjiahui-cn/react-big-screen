/**
 * base （基础组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import { buttonTriggers, buttonExposes } from "./Text";
import React from "react";

export const base: ComponentType[] = [
  {
    cId: "text",
    cName: "文本",
    icon: () => import("@/static/built-in/text.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 32,
    component: React.lazy(() => import("./Text")),
    attributesComponent: React.lazy(() => import("./Text/attributes")),
    triggers: buttonTriggers,
    exposes: buttonExposes,
  },
  {
    cId: "title",
    cName: "标题",
    icon: () => import("@/static/built-in/title.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 48,
    component: React.lazy(() => import("./Title")),
    attributesComponent: React.lazy(() => import("./Title/attributes")),
  },
  {
    cId: "button",
    cName: "按钮",
    icon: () => import("@/static/built-in/button.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 64,
    height: 32,
    component: React.lazy(() => import("./Button")),
    attributesComponent: React.lazy(() => import("./Button/attributes")),
  },
  {
    cId: "background",
    cName: "背景",
    icon: () => import("@/static/built-in/background.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 500,
    height: 300,
    component: React.lazy(() => import("./Background")),
    attributesComponent: React.lazy(() => import("./Background/attributes")),
  },
  {
    cId: "image",
    cName: "图片",
    icon: () => import("@/static/built-in/image.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 270,
    height: 150,
    component: React.lazy(() => import("./Image")),
    attributesComponent: React.lazy(() => import("./Image/attributes")),
  },
];
