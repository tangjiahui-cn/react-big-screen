/**
 * TabsHead
 *
 * @author tangjiahui
 * @date 2025/3/14
 */
import styles from "./index.module.less";
import React, { useRef } from "react";
import classNames from "classnames";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { isRectInner } from "@/utils";

interface Props {
  showAdd?: boolean; // 显示新增按钮
  showDelete?: boolean; // 显示删除按钮
  value?: any; // 选中项
  items?: {
    label?: string;
    value?: any;
  }[];
  onAdd?: () => void;
  onDelete?: (value: any) => void;
  onChange?: (value: any) => void;
  style?: React.CSSProperties;
}

export default function TabsHead(props: Props) {
  const domRef = useRef<HTMLDivElement>(null);

  // 判断点击项是否完全在 domRef 可视范围内
  function isFullVisibleInContainer(dom: HTMLDivElement): boolean {
    const domRect = dom.getBoundingClientRect();
    const containerRect = domRef.current!.getBoundingClientRect();
    return isRectInner(
      { x1: domRect.x, y1: domRect.y, x2: domRect.right, y2: domRect.bottom },
      {
        x1: containerRect.x,
        y1: containerRect.y,
        x2: containerRect.right,
        y2: containerRect.bottom,
      },
    );
  }

  // 滚动到dom
  function scrollToDom(dom: HTMLDivElement) {
    if (isFullVisibleInContainer(dom)) return;
    // 如果不完全处在容器可视区域内，才点击滚动
    domRef.current!.scrollTo({
      left: dom.offsetLeft - 20, // -20 是为了能刚好看到前一个
      behavior: "smooth",
    });
  }

  return (
    <div style={props?.style} className={styles.tabsHead}>
      <div className={styles.tabsHead_body} ref={domRef}>
        <div className={styles.tabsHead_body_inner}>
          {props?.items?.map?.((item, index) => {
            const isSelected = item?.value === props?.value;
            return (
              <div
                key={item?.value || index}
                className={classNames(
                  styles.tabsHead_item,
                  isSelected && styles.tabsHead_item_selected,
                )}
                onClick={(e) => {
                  if (isSelected) return;
                  scrollToDom(e.target as HTMLDivElement);
                  props?.onChange?.(item?.value);
                }}
              >
                {item?.label}
                <CloseOutlined
                  className={classNames(styles.tabsHead_item_delete, "icon_clickable")}
                  onClick={(e) => {
                    e.stopPropagation();
                    props?.onDelete?.(item.value);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {props?.showAdd && (
        <div className={styles.tabsHead_add} onClick={props?.onAdd}>
          <PlusOutlined />
        </div>
      )}
    </div>
  );
}
