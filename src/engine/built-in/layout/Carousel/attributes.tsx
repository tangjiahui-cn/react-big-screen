/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { AttributesComponentProps, ComponentNodeType } from "@/engine";
import { IColorPicker, IInputNumber, Line } from "@/components/Attributes";
import { Checkbox } from "antd";
import ICustomSelect from "@/components/ICustomSelect";

export interface CarouselOptions {
  children?: ComponentNodeType[]; // 子元素
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  autoplay?: boolean; // 自动播放
  value?: number; // 展示索引
  count?: number; // 面板数量
}

export default function (props: AttributesComponentProps<CarouselOptions>) {
  const { options, onChange } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Line label={"面板数量"} labelSpan={5} labelTip={"总共多少个面板"}>
        <IInputNumber
          min={1}
          value={options?.count}
          style={{ width: "100%" }}
          onChange={(count: any) => {
            // 确保当前展示面板是正确的
            if (options?.value !== undefined && options?.value > count) {
              onChange({ count, value: 0 });
              return;
            }
            onChange({ count });
          }}
        />
      </Line>
      <Line label={"展示面板"} labelSpan={5} labelTip={"当前展示第几个面板"}>
        <ICustomSelect
          allowClear={false}
          value={options?.value || 0}
          style={{ width: "100%" }}
          onChange={(value: any) => {
            onChange({ value });
          }}
          effectParams={[options?.count]}
          requestFn={async () => {
            return Array(options?.count || 0)
              .fill(null)
              .map((_, index) => {
                return {
                  label: `面板${index + 1}`, // 实际计数从0开始，显示从1开始是从用户角度考虑
                  value: index,
                };
              });
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
