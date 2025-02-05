/**
 * 行布局配置（Line）
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React from "react";
import { Col, Row, Tooltip } from "antd";
import styles from "./Line.module.less";
import classNames from "classnames";

interface LineProps {
  // label
  label?: React.ReactNode;
  // label-tips
  labelTip?: React.ReactNode;
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
    <Row style={props?.style} className={styles.line}>
      <Col
        span={labelSpan}
        className={classNames(styles.line_label, props?.labelTip && styles.line_help)}
      >
        {props?.labelTip ? <Tooltip title={props?.labelTip}>{props?.label}</Tooltip> : props?.label}
      </Col>
      <Col span={childrenSpan}>{props?.children}</Col>
    </Row>
  );
}
