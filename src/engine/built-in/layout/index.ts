/**
 * layout （布局组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import { triggers as CarouselTriggers, exposes as CarouselExposes } from "./Carousel";
import React from "react";

export const layout: ComponentType[] = [
  {
    cId: "carousel",
    cName: "走马灯",
    icon: () => import("@/static/built-in/carousel.png"),
    category: "layout",
    x: 0,
    y: 0,
    width: 500,
    height: 250,
    component: React.lazy(() => import("./Carousel")),
    attributesComponent: React.lazy(() => import("./Carousel/attributes")),
    panels: [
      {
        label: "面板一",
        value: "",
      },
      {
        label: "面板二",
        value: "",
      },
    ],
    triggers: CarouselTriggers,
    exposes: CarouselExposes,
  },
  {
    cId: "specialCard",
    cName: "特殊卡片",
    category: "layout",
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    component: React.lazy(() => import("./SpecialCard")),
    attributesComponent: React.lazy(() => import("./SpecialCard/attributes")),
    icon: () => import("@/static/built-in/specialCard.png"),
    panels: [{ label: "特殊卡片", value: "" }],
    options: {
      title: "标题",
      bordered: true,
      borderColor: "rgba(83, 141, 233, 0.54)",
      background: "rgba(22, 28, 48, 0.8)",
      color: "rgb(71, 216, 218)",
    },
  },
];
