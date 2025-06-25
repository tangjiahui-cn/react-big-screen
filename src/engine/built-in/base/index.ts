/**
 * base （基础组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import { textTriggers, textExposes } from "./Text";
import React from "react";
import { buttonTriggers } from "@/engine/built-in/base/Button";
import { inputExposes, inputTriggers } from "@/engine/built-in/base/Input";
import { titleExposes, titleTriggers } from "@/engine/built-in/base/Title";

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
    triggers: textTriggers,
    exposes: textExposes,
  },
  {
    cId: "input",
    cName: "输入框",
    icon: () => import("@/static/built-in/input.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 250,
    height: 32,
    triggers: inputTriggers,
    exposes: inputExposes,
    component: React.lazy(() => import("./Input")),
    attributesComponent: React.lazy(() => import("./Input/attributes")),
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
    triggers: titleTriggers,
    exposes: titleExposes,
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
    triggers: buttonTriggers,
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
  {
    cId: "dateDisplay",
    cName: "日期展示",
    // icon: () => import("@/static/built-in/image.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 250,
    height: 32,
    component: React.lazy(() => import("./DateDisplay")),
    attributesComponent: React.lazy(() => import("./DateDisplay/attributes")),
  },
  {
    cId: "doubleText",
    cName: "双行文本",
    category: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 64,
    component: React.lazy(() => import("./DoubleText")),
    attributesComponent: React.lazy(() => import("./DoubleText/attributes")),
  },
];
