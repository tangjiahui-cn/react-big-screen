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
  showLabel?: boolean; // 显示标签
  bgColor?: string; // 背景颜色
  mapBgColor?: string; // 地图背景颜色
  mapHoverColor?: string; // 鼠标经过颜色
  mapSelectedColor?: string; // 选中区块颜色
  outlineColor?: string; // 轮廓颜色
  color?: string; // 文字颜色

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
      key: "showLabel",
      label: "显示标签",
      component: "checkbox",
    },
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
    {
      key: "outlineColor",
      label: "轮廓颜色",
      component: "colorPicker",
      options: {
        defaultColor: "#23c2fb",
        reset: true,
      },
    },
    {
      key: "color",
      label: "文字颜色",
      component: "colorPicker",
      options: {
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
