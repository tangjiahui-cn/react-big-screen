/**
 * RenderPopover
 *
 * @author tangjiahui
 * @date 2025/2/13
 * @description 渲染item详细信息
 */

import { ComponentNodeType } from "@/engine";
import { Space, Switch } from "antd";

export default function RenderPopover(props: { componentNode: ComponentNodeType }) {
  const { componentNode } = props;
  return (
    <Space direction={"vertical"} style={{ fontSize: 12 }} className={"theme-color"} size={6}>
      <div>
        <b>id</b>：{componentNode?.id}
      </div>
      <div>
        <b>name</b>：{componentNode?.name}
      </div>
      <div>
        <b>cName</b>：{componentNode?.cName}
      </div>
      <div>
        <b>show</b>：
        <Switch disabled size={"small"} checked={componentNode?.show ?? true} />
      </div>
    </Space>
  );
}
