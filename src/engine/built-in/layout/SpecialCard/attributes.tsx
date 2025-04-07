/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { createAttributesByConfig } from "@/engine";
import { useMemo } from "react";

export const DEFAULT_OPTIONS = {
  title: "标题",
  bordered: true,
  borderColor: "rgba(83, 141, 233, 0.54)",
  background: "rgba(22, 28, 48, 0.8)",
  color: "rgb(71, 216, 218)",
};

export interface SpecialCardOptions {
  title?: string; // 标题内容

  // 边框
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  borderWidth?: number; // 边框宽度（像素）
  borderRadius?: number; // 边框圆角

  // 背景
  background?: string; // 背景颜色

  // 文字
  color?: string; // 文字颜色
}

export default createAttributesByConfig<SpecialCardOptions>(
  [
    { key: "title", label: "标题", component: "input" },
    { key: "bordered", label: "边框", component: "checkbox" },
    ({ useExtra }) => {
      const extra = useExtra();
      return useMemo(() => {
        if (!extra.options?.bordered) return null;
        return createAttributesByConfig<SpecialCardOptions>([
          { key: "borderWidth", label: "边框宽度", component: "inputNumber" },
          { key: "borderColor", label: "边框颜色", component: "colorPicker" },
        ])(extra);
      }, [extra.componentNode]);
    },
    { key: "borderRadius", label: "边框圆角", component: "inputNumber" },
    { key: "background", label: "背景", component: "colorPicker" },
    {
      key: "color",
      label: "文字颜色",
      component: "colorPicker",
      options: {
        reset: true,
      },
    },
  ],
  DEFAULT_OPTIONS,
);
