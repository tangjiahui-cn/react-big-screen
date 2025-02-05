/**
 * 行布局配置（Line）
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React from "react";
import { Col, Row } from "antd";

interface LineProps {
  // label
  label?: React.ReactNode;
  // label-span
  labelSpan?: number;
  // 显示内容
  children?: React.ReactNode;
  // 外层样式
  style?: React.CSSProperties;
}

export default function Line(props: LineProps) {
  const { labelSpan = 3 } = props;
  const childrenSpan = 24 - labelSpan;
  return (
    <Row style={props?.style}>
      <Col span={labelSpan} style={{ lineHeight: "24px" }}>
        {props?.label}
      </Col>
      <Col span={childrenSpan}>{props?.children}</Col>
    </Row>
  );
}
