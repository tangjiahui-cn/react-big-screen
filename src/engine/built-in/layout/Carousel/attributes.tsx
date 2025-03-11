/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { ComponentNodeType } from "@/engine";
import { IColorPicker, Line } from "@/components/Attributes";
import { Checkbox } from "antd";
import EditList from "./components/EditList";
import { createAttributes } from "@/engine";

export interface CarouselOptions {
  children?: ComponentNodeType[]; // 子元素
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  count?: number; // 面板数量
}

export default createAttributes<CarouselOptions>((props) => {
  const { options, onChange, componentNode, onChangeComponentNode } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Line label={"边框"} labelSpan={3}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox
            checked={options?.bordered}
            onChange={(e) => {
              onChange({
                bordered: e.target.checked,
              });
            }}
          />
          {options?.bordered && (
            <IColorPicker
              style={{ flex: 1 }}
              value={options?.borderColor}
              onChange={(borderColor) => onChange({ borderColor })}
            />
          )}
        </div>
      </Line>
      <Line label={"面板"}>
        <EditList
          value={componentNode.currentPanelId}
          onSelect={(currentPanelId) => {
            onChangeComponentNode({
              currentPanelId,
            });
          }}
          list={componentNode.panels}
          onChange={(panels) => {
            onChangeComponentNode({
              panels: [...panels],
            });
          }}
        />
      </Line>
    </div>
  );
});
