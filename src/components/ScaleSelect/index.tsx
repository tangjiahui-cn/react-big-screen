/**
 * 缩放比率下拉框
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { Popover, Slider, Space } from "antd";
import { DownOutlined, ReloadOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { IInputNumber } from "@/components/Attributes";
import TooltipButton from "@/components/TooltipButton";
import { useConfig } from "@/engine";

const MARKS = {
  50: <span style={{ fontSize: 12 }}>50%</span>,
  100: <span style={{ fontSize: 12 }}>100%</span>,
  150: <span style={{ fontSize: 12 }}>150%</span>,
  200: " ",
};

interface Props {
  isCustom?: boolean; // 是否支持自定义修改值
  value?: number; // 缩放比率(单位1)
  onChange?: (value: number) => void;
}

export default function ScaleSelect(props: Props) {
  const { value = 1, isCustom } = props;

  // 全局配置
  const config = useConfig();
  // 最小缩放
  const MIN = useMemo(() => config.scaleMinZoom * 100, [config]);
  // 最大缩放
  const MAX = useMemo(() => config.scaleMaxZoom * 100, [config]);
  // 默认缩放
  const DEFAULT = useMemo(() => config.scaleDefault * 100, [config]);
  // 比率值（单位%）
  const rateValue = useMemo(() => Math.round(value * 100), [value]);

  function handleSelect(value: number) {
    const targetValue = Math.round(Number(value)) / 100;
    if (targetValue !== rateValue) {
      props?.onChange?.(targetValue);
    }
  }

  return (
    <Popover
      content={
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Slider
            style={{ width: 250 }}
            min={MIN}
            max={Math.max(MAX, rateValue)}
            tooltip={{
              formatter: (rate) => `${rate}%`,
            }}
            marks={MARKS}
            value={rateValue}
            onChange={handleSelect}
          />
          <Space style={{ marginTop: -16 }}>
            {isCustom && (
              <IInputNumber
                min={MIN}
                max={1000}
                value={rateValue}
                placeholder={"缩放值"}
                style={{ fontSize: 12, width: 80 }}
                onChange={(v) => {
                  handleSelect(v || 1);
                }}
              />
            )}
            <TooltipButton noHoverClass title={"重置"}>
              <ReloadOutlined
                className={"theme-color icon_clickable"}
                onClick={() => {
                  // 选中默认值
                  handleSelect(DEFAULT);
                }}
              />
            </TooltipButton>
          </Space>
        </div>
      }
    >
      <span style={{ cursor: "pointer" }}>
        <span style={{ marginRight: 4 }}>{`${rateValue}%`}</span>
        <DownOutlined />
      </span>
    </Popover>
  );
}
