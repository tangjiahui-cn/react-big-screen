/**
 * 行布局配置（Line）
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React, { createContext, useContext, useMemo } from "react";
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
  const context = useLineConfigContext();
  const { labelSpan = context?.labelSpan } = props;
  const childrenSpan = 24 - labelSpan;
  return (
    <Row style={props?.style} className={styles.line}>
      <Col span={labelSpan} className={classNames(props?.labelTip && styles.line_help)}>
        {props?.labelTip ? <Tooltip title={props?.labelTip}>{props?.label}</Tooltip> : props?.label}
      </Col>
      <Col span={childrenSpan}>{props?.children}</Col>
    </Row>
  );
}

const LineContext = createContext({
  labelSpan: 3,
});

interface LineConfigProviderProps {
  labelSpan?: number;
  children?: React.ReactNode;
}

function useLineConfigContext() {
  return useContext(LineContext);
}

export const LineConfigProvider = (props: LineConfigProviderProps) => {
  const value = useMemo(
    () => ({
      labelSpan: props.labelSpan || 3,
    }),
    [props?.labelSpan],
  );
  return <LineContext.Provider value={value}>{props?.children}</LineContext.Provider>;
};
