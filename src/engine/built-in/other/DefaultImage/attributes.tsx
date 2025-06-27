/**
 * 预置图片-配置
 */
import { createAttributesByConfig } from "@/engine";
import ICustomSelect from "@/components/ICustomSelect";

export const DEFAULT_OPTIONS: ScrollListOptions = {
  id: "clock.png",
};

export interface ScrollListOptions {
  // 预置图片id
  id?: string;
}

export default createAttributesByConfig<ScrollListOptions>(
  [
    <b key={"data"}>基本配置</b>,
    {
      key: "id",
      label: "选择图片",
      component: ({ value, onChange }) => {
        return (
          <ICustomSelect
            value={value}
            onChange={onChange}
            style={{ width: "100%" }}
            requestFn={async () => {
              return [
                { label: "闹钟", value: "clock.png" },
                { label: "主题背景-1", value: "bg-theme-1.jpeg" },
                { label: "主题背景-2", value: "bg-theme-2.jpg" },
                { label: "主题背景-3", value: "bg-theme-3.jpg" },
                { label: "主题背景-4", value: "bg-theme-4.jpg" },
                { label: "主题背景-5", value: "bg-theme-5.jpg" },
                { label: "主题背景-6", value: "bg-theme-6.jpg" },
                { label: "主题背景-7", value: "bg-theme-7.jpg" },
                { label: "组件底座-1", value: "com-bg-1.png" },
                { label: "组件底座-2", value: "com-bg-2.png" },
                { label: "组件底座-3", value: "com-bg-3.png" },
                { label: "组件底座-4", value: "com-bg-4.png" },
                { label: "组件底座-5", value: "com-bg-5.png" },
                { label: "组件底座-6", value: "com-bg-6.png" },
                { label: "头部-1", value: "title-1.png" },
                { label: "头部-2", value: "title-2.png" },
                { label: "头部-3", value: "title-3.png" },
                { label: "头部-4", value: "title-4.png" },
                { label: "基础素材-1", value: "base-1.png" },
                { label: "基础素材-2", value: "base-2.png" },
                { label: "基础素材-3", value: "base-3.png" },
                { label: "基础素材-4", value: "base-4.png" },
              ];
            }}
          />
        );
      },
    },
  ],
  DEFAULT_OPTIONS,
);
