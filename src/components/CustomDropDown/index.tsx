/**
 * 自定义DropDown内容（类似于Dialog）
 *
 * @author tangjiahui
 * @date 2025/4/25
 */
import { Dropdown } from "antd";
import React from "react";
import styles from "./index.module.less";
import classNames from "classnames";

type CloseCallback = () => void;

interface CustomDropDownProps {
  visible?: boolean;
  trigger?: ("click" | "hover" | "contextMenu")[]; // 下拉触发条件
  children?: React.ReactNode | ((close: CloseCallback) => React.ReactNode); // 占位符
  overlayChildren?: React.ReactNode | ((close: CloseCallback) => React.ReactNode); // 下拉内容
  overlayClassName?: string;
  className?: string;
  onClose?: () => void; // 关闭回调函数
}

const CustomDropDown = React.memo(function (props: CustomDropDownProps) {
  const { trigger = ["click"], overlayChildren, children } = props;

  // 弹窗内容
  const renderOverlayChildren =
    typeof overlayChildren === "function" ? overlayChildren?.(handleClose) : overlayChildren;

  // 占位符内容
  const renderChildren = typeof children === "function" ? children?.(handleClose) : children;

  // 关闭回调
  function handleClose() {
    props?.onClose?.();
  }

  return (
    <Dropdown
      className={props?.className}
      open={props?.visible}
      trigger={trigger}
      menu={{
        items: [
          {
            key: "body",
            label: renderOverlayChildren,
          },
        ],
      }}
      overlayClassName={classNames(styles.customDropDown, props?.overlayClassName)}
      onOpenChange={(visible) => {
        if (!visible) {
          handleClose();
        }
      }}
    >
      {renderChildren}
    </Dropdown>
  );
});

export default CustomDropDown;
