/**
 * 折线图属性面板
 */

import { createAttributesByConfig } from "@/engine";
import EditSeriesList, { SeriesItem } from "./components/EditSeriesList";
export type { SeriesItem };

export const DEFAULT_OPTIONS: LineOptions = {
  seriesList: [
    { key: "1", name: "数据1", value: "value1", color: "#f8e71c" },
    { key: "2", name: "数据2", value: "value2", color: "#7ed321" },
    { key: "3", name: "数据3", value: "value3", color: "#1071e0" },
  ],
};

export interface LineOptions {
  background?: string; // 背景颜色
  // 数据
  nameCode?: string; // x轴标签映射字段
  seriesList?: SeriesItem[]; // 图表数据映射配置
}

export default createAttributesByConfig<LineOptions>(
  [
    {
      key: "background",
      label: "背景",
      component: "colorPicker",
      options: { reset: true },
    },
    <b key={"data"} style={{ marginTop: 16 }}>
      数据配置
    </b>,
    { key: "nameCode", label: "字段", labelTip: "x轴标签名称映射字段", component: "input" },
    {
      key: "seriesList",
      label: "映射",
      labelTip: "图表的数据映射",
      component: ({ value, onChange }) => {
        return (
          <div style={{ border: "1px solid #e8e8e8" }}>
            <EditSeriesList value={value} onChange={onChange} />
          </div>
        );
      },
    },
  ],
  DEFAULT_OPTIONS,
);
