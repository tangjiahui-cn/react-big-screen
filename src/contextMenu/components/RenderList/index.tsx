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
  icon?: React.ReactNode; // 图标
  title?: React.ReactNode; // 展示标题
  disabled?: boolean; // 是否禁用
  selectable?: boolean; // 是否可选中自身（undefined可选中，null不可选中）
  onSelect?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // 选中触发函数
  children?: RenderListItem[]; // 子元素列表
  style?: React.CSSProperties; // 子元素样式
  titleStyle?: React.CSSProperties; // 子元素标题样式
}

export interface RenderListProps {
  items?: RenderListItem[]; // 选项列表
  onSelect?: (item: RenderListItem, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // 选中元素
}

export default function RenderList(props: RenderListProps) {
  return (
    <div className={styles.renderList}>
      {props?.items?.map?.((item) => {
        const isSelectable =
          !item?.disabled && (item?.selectable ?? item?.selectable === undefined);
        return (
          <HoverItem
            key={item?.key}
            items={item?.children}
            style={item?.style}
            className={classNames(
              styles.renderList_item,
              item?.disabled && styles.renderList_disabled,
              !isSelectable && styles.renderList_item_unselectable,
            )}
            // 浮层元素选中
            onSelect={(selectItem, e) => {
              props?.onSelect?.(selectItem, e);
              // 只有当前元素才会立刻执行
              if (selectItem.key === item.key) {
                item?.onSelect?.(e);
              }
            }}
            // 选中列表元素
            onClick={(e) => {
              e.stopPropagation();
              if (isSelectable) {
                props?.onSelect?.(item, e); // 点击当前元素
                item?.onSelect?.(e);
              }
            }}
          >
            <div className={styles.renderList_item_title} style={item?.titleStyle}>
              {item?.icon}
              {item?.title}
            </div>
            {!!item?.children?.length && <RightOutlined style={{ fontSize: "0.75em" }} />}
          </HoverItem>
        );
      })}
    </div>
  );
}
