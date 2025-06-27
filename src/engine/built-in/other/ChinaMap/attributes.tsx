/**
 * 折线图属性面板
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: ChinaMapOptions = {
  // mapHoverColor: "rgba(16,43,128,0.9)",
  // mapSelectedColor: "rgba(16,43,128,1)",
  areaColor: "#183558",
  centerX: 0,
  centerY: 0,
  scale: 0,
};

export interface ChinaMapOptions {
  // 基本配置
  showLabel?: boolean; // 显示标签
  bgColor?: string; // 背景颜色
  areaColor?: string; // 地图背景颜色
  mapHoverColor?: string; // 鼠标经过颜色
  mapSelectedColor?: string; // 选中区块颜色
  outlineColor?: string; // 轮廓颜色
  borderWidth?: number; // 轮廓宽度
  color?: string; // 文字颜色

  // 位移配置
  centerX?: number; // 中心 x坐标（单位%）
  centerY?: number; // 中心 y坐标（单位%）
  scale?: number; // 缩放比例（单位%）
}

export default createAttributesByConfig<ChinaMapOptions>(
  [
    <b key={"data"} style={{ marginTop: 12 }}>
      基本配置
    </b>,
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
        resetColor: "transparent",
      },
    },
    {
      key: "areaColor",
      label: "地图颜色",
      component: "colorPicker",
      options: {
        reset: true,
        resetColor: DEFAULT_OPTIONS.areaColor,
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
      key: "borderWidth",
      label: "轮廓宽度",
      component: "inputNumber",
    },
    {
      key: "color",
      label: "文字颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
    <b key={"data"} style={{ marginTop: 12 }}>
      位移配置
    </b>,
    {
      key: "centerX",
      label: "中心坐标 x",
      component: "slider",
      options: {
        min: -100,
        max: +100,
      },
    },
    {
      key: "centerY",
      label: "中心坐标 y",
      component: "slider",
      options: {
        min: -100,
        max: +100,
      },
    },
    {
      key: "scale",
      label: "缩放比例",
      component: "slider",
      options: {
        min: -100,
        max: +100,
      },
    },
  ],
  DEFAULT_OPTIONS,
);
