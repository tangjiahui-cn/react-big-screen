/**
 * 折线图属性面板
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: ChinaMapOptions = {
  // mapHoverColor: "rgba(16,43,128,0.9)",
  // mapSelectedColor: "rgba(16,43,128,1)",
};

export interface ChinaMapOptions {
  // 基本配置
  bgColor?: string;
  mapBgColor?: string;
  mapHoverColor?: string;
  mapSelectedColor?: string;

  // 位移配置
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export default createAttributesByConfig<ChinaMapOptions>(
  [
    <b key={"data"}>基本配置</b>,
    {
      key: "bgColor",
      label: "背景颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
    {
      key: "mapBgColor",
      label: "地图颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
    {
      key: "mapHoverColor",
      label: "地图经过颜色",
      component: "colorPicker",
      options: {
        defaultColor: "rgba(16,43,128,0.9)",
        reset: true,
      },
    },
    {
      key: "mapSelectedColor",
      label: "地图选中颜色",
      component: "colorPicker",
      options: {
        defaultColor: "rgba(16,43,128,1)",
        reset: true,
      },
    },
    <b key={"data"}>位移配置</b>,
    {
      key: "top",
      label: "top",
      component: "input",
    },
    {
      key: "right",
      label: "right",
      component: "input",
    },
    {
      key: "bottom",
      label: "bottom",
      component: "input",
    },
    {
      key: "left",
      label: "left",
      component: "input",
    },
  ],
  DEFAULT_OPTIONS,
);
