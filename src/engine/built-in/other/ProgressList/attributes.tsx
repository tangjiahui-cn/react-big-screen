/**
 * 进度条列表
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: ProgressListOptions = {
  // 基本配置
  progressColor: "#2949ca",
  progressBgColor: "#143053",
  titleColor: "#fff",
  titleFontSize: 14,
  countColor: "#fff",
  countFontSize: 14,
  // 滚动配置
  autoScroll: true,
  pxPerSecond: 12,
};

export interface ProgressListOptions {
  // 基本配置
  max?: number; // 最大值（空则自动取列表最大值）
  progressColor?: string; // 进度条颜色
  progressBgColor?: string; // 进度条背景色
  titleColor?: string; // 标题颜色
  titleFontSize?: number; // 标题大小
  countColor?: string; // 数量颜色
  countFontSize?: number; // 数量大小
  iconColor?: string; // 图标颜色
  // 滚动配置
  pxPerSecond?: number; // 每秒滚动像素
  autoScroll?: boolean; // 开启自动滚动
}

export default createAttributesByConfig<ProgressListOptions>(
  [
    <b key={"data"}>基本配置</b>,
    {
      key: "max",
      label: "最大值",
      component: "inputNumber",
    },
    {
      key: "progressColor",
      label: "颜色",
      component: "colorPicker",
      options: {
        reset: true,
        resetColor: DEFAULT_OPTIONS?.progressColor,
      },
    },
    {
      key: "progressBgColor",
      label: "底色",
      component: "colorPicker",
      options: {
        reset: true,
        resetColor: DEFAULT_OPTIONS?.progressBgColor,
      },
    },
    {
      key: "titleColor",
      label: "标题颜色",
      component: "colorPicker",
      options: {
        reset: true,
        resetColor: DEFAULT_OPTIONS?.titleColor,
      },
    },
    {
      key: "titleFontSize",
      label: "标题字号",
      component: "inputNumber",
    },
    {
      key: "countColor",
      label: "数量颜色",
      component: "colorPicker",
      options: {
        reset: true,
        resetColor: DEFAULT_OPTIONS?.countColor,
      },
    },
    {
      key: "countFontSize",
      label: "数量字号",
      component: "inputNumber",
    },
    {
      key: "iconColor",
      label: "图标颜色",
      component: "colorPicker",
    },
    <b key={"data"}>滚动配置</b>,
    {
      key: "pxPerSecond",
      label: "每秒滚动像素",
      component: "inputNumber",
    },
    {
      key: "autoScroll",
      label: "自动滚动",
      component: "checkbox",
    },
  ],
  DEFAULT_OPTIONS,
);
