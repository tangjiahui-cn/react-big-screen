/**
 * TooltipButton
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import { Tooltip, TooltipProps } from "antd";
import styles from "./index.module.less";
import React, { MouseEventHandler } from "react";
import classNames from "classnames";

interface TooltipButtonProps {
  disabled?: boolean;
  title?: TooltipProps["title"];
  noHoverClass?: boolean; // 不显示鼠标经过样式
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  children?: React.ReactNode;
}

export default function TooltipButton(props: TooltipButtonProps) {
  return (
    <Tooltip title={props?.title}>
      <div
        className={classNames(
          styles.tooltipButton,
          props?.disabled && styles.tooltipButton_disabled,
          !props?.noHoverClass && styles.tooltipButton_hover,
        )}
        onClick={(e) => {
          if (!props?.disabled) {
            props?.onClick?.(e);
          }
        }}
      >
        {props?.children}
      </div>
    </Tooltip>
  );
}
