/**
 * 行布局配置（Line）
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React, { createContext, useContext } from "react";
import { Col, Row, Tooltip } from "antd";
import styles from "./Line.module.less";
import classNames from "classnames";

export interface LineProps {
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
  // children样式
  childrenStyle?: React.CSSProperties;
}

export function Line(props: LineProps) {
  const context = useLineConfigContext();
  const { labelSpan = context?.labelSpan } = props;
  const childrenSpan = 24 - labelSpan;
  return (
    <Row
      style={{
        ...props?.style,
        ...context?.itemStyle,
      }}
      className={styles.line}
    >
      <Col
        span={labelSpan}
        className={classNames(props?.labelTip && styles.line_help)}
        style={context?.labelStyle}
      >
        {props?.labelTip ? <Tooltip title={props?.labelTip}>{props?.label}</Tooltip> : props?.label}
      </Col>
      <Col span={childrenSpan} style={props?.childrenStyle}>
        {props?.children}
      </Col>
    </Row>
  );
}

interface LineContextType {
  labelSpan: number;
  itemStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

interface LineConfigProviderProps extends Partial<LineContextType> {
  children?: React.ReactNode;
}

const LineContext = createContext<LineContextType>({
  labelSpan: 3,
});

function useLineConfigContext() {
  return useContext(LineContext);
}

export const LineConfigProvider = React.memo((props: LineConfigProviderProps) => {
  return (
    <LineContext.Provider
      value={{
        labelSpan: props.labelSpan || 3,
        labelStyle: props?.labelStyle,
        itemStyle: props?.itemStyle,
      }}
    >
      {props?.children}
    </LineContext.Provider>
  );
});
