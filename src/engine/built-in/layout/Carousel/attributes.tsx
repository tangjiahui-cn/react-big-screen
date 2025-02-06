/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { AttributesComponentProps } from "@/engine";
import { IColorPicker, Line } from "@/components/Attributes";
import { Checkbox } from "antd";
import ICustomSelect from "@/components/ICustomSelect";

export interface CarouselOptions {
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  autoplay?: boolean; // 自动播放
  value?: number; // 展示索引
}

export default function (props: AttributesComponentProps<CarouselOptions>) {
  const { options, onChange } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Line label={"展示面板"} labelSpan={5}>
        <ICustomSelect
          value={options?.value}
          style={{ width: "100%" }}
          onChange={(value: any) => {
            onChange({ value });
          }}
          requestFn={async () => {
            return [
              { label: "面板1", value: 0 },
              { label: "面板2", value: 1 },
              { label: "面板3", value: 2 },
            ];
          }}
        />
      </Line>
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
    </div>
  );
}
