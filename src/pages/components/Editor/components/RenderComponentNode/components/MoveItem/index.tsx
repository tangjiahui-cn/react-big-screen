/**
 * 拖拽组件
 *
 * @author tangjiahui
 * @date 2025/1/8
 * @description 用于改变组件的x、y、width、height。
 */
import React, { ForwardedRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./index.module.less";
import { moveDom } from "./moveDom";
import classNames from "classnames";

export interface MoveItemRefType {
  // 选中组件
  handleSelected: () => void;
  // 取消选中组件
  handleUnSelected: () => void;
}

interface MoveItemProps extends React.HTMLProps<HTMLDivElement> {
  onMoveEnd?: (deltaX: number, deltaY: number) => void;
}

const MoveItem = React.forwardRef((props: MoveItemProps, ref: ForwardedRef<MoveItemRefType>) => {
  const { onMoveEnd, className, ...rest } = props;
  const containerDomRef = useRef<HTMLDivElement>(null);
  const boxDomRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      handleSelected() {
        if (!boxDomRef.current) return;
        boxDomRef.current.classList.add(styles.moveItem_box_selected);
      },
      handleUnSelected() {
        if (!boxDomRef.current) return;
        boxDomRef.current.classList.remove(styles.moveItem_box_selected);
      },
    };
  });

  useEffect(() => {
    const dom = containerDomRef.current;
    if (!dom) return;
    return moveDom(dom, {
      onEnd(deltaX: number, deltaY: number) {
        onMoveEnd?.(deltaX, deltaY);
      },
    });
  }, []);

  return (
    <div {...rest} className={classNames(className, styles.moveItem)} ref={containerDomRef}>
      {props?.children}

      {/* 遮罩层 */}
      <div className={styles.moveItem_box} ref={boxDomRef} />
    </div>
  );
});

export default MoveItem;
