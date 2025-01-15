/**
 * RenderList
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import React from "react";
import styles from "./index.module.less";
import { RightOutlined } from "@ant-design/icons";
import HoverItem from "@/contextMenu/components/HoverItem";
import classNames from "classnames";

export interface RenderListItem {
  key: string; // 唯一key
  title?: React.ReactNode; // 展示标题
  selectable?: boolean; // 是否可选中自身（undefined可选中，null不可选中）
  children?: RenderListItem[]; // 子元素列表
}

export interface RenderListProps {
  items?: RenderListItem[]; // 选项列表
  onSelect?: (item: RenderListItem) => void; // 选中元素
}

export default function RenderList(props: RenderListProps) {
  return (
    <div className={styles.renderList}>
      {props?.items?.map?.((item) => {
        const isSelectable = item?.selectable ?? item?.selectable === undefined;
        return (
          <HoverItem
            key={item?.key}
            items={item?.children}
            className={classNames(
              styles.renderList_item,
              !isSelectable && styles.renderList_item_unselectable,
            )}
            onSelect={(selectItem) => {
              props?.onSelect?.(selectItem); // 浮层元素点击
            }}
            onClick={(e) => {
              if (isSelectable) {
                props?.onSelect?.(item); // 点击当前元素
              }
              e.stopPropagation();
            }}
          >
            {item?.title}
            {!!item?.children?.length && <RightOutlined style={{ fontSize: "0.75em" }} />}
          </HoverItem>
        );
      })}
    </div>
  );
}
