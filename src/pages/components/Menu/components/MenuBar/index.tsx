/**
 * MenuBar
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { Tooltip } from "antd";

export interface MenuBarItem {
  key: string;
  icon: React.ReactNode;
  title: any;
}

interface Props {
  value: string;
  list: MenuBarItem[];
  onChange: (value: string) => void;
}

export default function MenuBar(props: Props) {
  return (
    <div className={styles.menubar}>
      {props?.list?.map?.((item) => {
        const isSelected = item.key === props.value;
        return (
          <Tooltip key={item?.key} title={item?.title} placement={"right"}>
            <div
              className={classNames(
                styles.menubar_item,
                isSelected && styles.menubar_item_selected,
              )}
              onClick={() => {
                props?.onChange?.(item?.key);
              }}
            >
              {item.icon}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
