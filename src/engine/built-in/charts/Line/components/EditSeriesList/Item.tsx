import { Space } from "antd";
import { SeriesItem } from ".";
import { IColorPicker, IInput, Line, LineConfigProvider } from "@/components/Attributes";

interface Props {
  value?: SeriesItem;
  onChange?: (value: SeriesItem) => void;
}
export default function (props: Props) {
  const { value, onChange } = props;

  function emitChange(extValue: Partial<SeriesItem>) {
    onChange?.({
      ...value,
      ...extValue,
    } as any);
  }

  return (
    <LineConfigProvider labelSpan={6}>
      <Space direction={"vertical"} style={{ width: "100%", padding: 12 }}>
        <Line label={"名称"}>
          <IInput value={value?.name} onChange={(name) => emitChange({ name })} />
        </Line>
        <Line label={"字段"}>
          <IInput value={value?.value} onChange={(value) => emitChange({ value })} />
        </Line>
        <Line label={"颜色"}>
          <IColorPicker value={value?.color} onChange={(color) => emitChange({ color })} />
        </Line>
      </Space>
    </LineConfigProvider>
  );
}
