/**
 * 折线图属性面板
 */

import { createAttributes } from "@/engine";
import { AttrContainer, IColorPicker, IInput, Line, ResetButton } from "@/components/Attributes";
import EditSeriesList, { SeriesItem } from "./components/EditSeriesList";
export type { SeriesItem };

export interface LineOptions {
  background?: string; // 背景颜色
  // 数据
  nameCode?: string; // x轴标签映射字段
  seriesList?: SeriesItem[]; // 图表数据映射配置
}

export default createAttributes<LineOptions>(({ options, onChange }) => {
  return (
    <AttrContainer>
      <Line label={"背景"} childrenStyle={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IColorPicker
          style={{ flex: 1 }}
          value={options?.background}
          onChange={(background) => {
            onChange({ background });
          }}
        />
        <ResetButton
          onClick={() => {
            onChange({ background: undefined });
          }}
        />
      </Line>
      <b style={{ marginTop: 16 }}>数据配置</b>
      <Line label={"字段"} labelTip={"x轴标签名称映射字段"}>
        <IInput
          value={options?.nameCode ?? "name"}
          onChange={(nameCode) => {
            onChange({ nameCode });
          }}
        />
      </Line>
      <Line label={"映射"} labelTip={"图表的数据映射"}>
        <div style={{ border: "1px solid #e8e8e8" }}>
          <EditSeriesList
            value={options?.seriesList}
            onChange={(seriesList) => {
              onChange({
                seriesList,
              });
            }}
          />
        </div>
      </Line>
    </AttrContainer>
  );
});
