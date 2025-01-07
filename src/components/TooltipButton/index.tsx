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
