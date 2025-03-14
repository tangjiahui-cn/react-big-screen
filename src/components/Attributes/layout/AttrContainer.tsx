/**
 * 属性面板容器组件
 *
 * @author tangjiahui
 * @date 2025/3/14
 */
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export function AttrContainer(props: Props) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{props.children}</div>;
}
