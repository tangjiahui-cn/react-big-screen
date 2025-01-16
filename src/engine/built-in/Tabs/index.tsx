/**
 * Tabs
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Tabs } from "antd";
import { ComponentProps } from "@/engine";

type InputProps = ComponentProps<{
  // 标签页头部配置列表
  items?: {
    key: string; // 标签页 key
    label: string; // 标签页文字
  }[];
}>;

export default function (props: InputProps) {
  const { options, width, height } = props;
  return (
    <div style={{ width, height, background: "white" }}>
      <Tabs size='small' items={options?.items} />
    </div>
  );
}
