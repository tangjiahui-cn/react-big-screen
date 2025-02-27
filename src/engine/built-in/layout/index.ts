/**
 * layout （布局组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import Carousel, { triggers as CarouselTriggers, exposes as CarouselExposes } from "./Carousel";
import CarouselAttributes from "./Carousel/attributes";

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
    options: {
      bordered: true,
      borderColor: "#ccc", // 边框颜色
    },
    component: Carousel,
    attributesComponent: CarouselAttributes,
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
];
