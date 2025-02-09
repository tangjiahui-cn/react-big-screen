/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { AttributesComponentProps, ComponentNodeType } from "@/engine";
import { IColorPicker, Line } from "@/components/Attributes";
import { Checkbox } from "antd";
import EditList from "./components/EditList";

export interface CarouselOptions {
  children?: ComponentNodeType[]; // 子元素
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  autoplay?: boolean; // 自动播放
  count?: number; // 面板数量
}

export default function (props: AttributesComponentProps<CarouselOptions>) {
  const { options, onChange, componentNode, onChangeComponentNode } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Line label={"边框"} labelSpan={5}>
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
      <Line label={"自动播放"} labelSpan={5}>
        <Checkbox
          checked={options?.autoplay}
          onChange={(e) => {
            onChange({
              autoplay: e.target.checked,
            });
          }}
        />
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
}
