/**
 * 拖拽组件
 *
 * @author tangjiahui
 * @date 2025/1/8
 * @description 用于改变组件的x、y、width、height。
 */
import React, { ForwardedRef, useImperativeHandle, useRef } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { useItemContextMenu, useItemDragSize, useItemDragMove } from "../../hooks";

export interface MoveItemRefType {
  // 容器dom
  containerDom: HTMLDivElement;
  // 选中组件
  handleSelected: () => void;
  // 取消选中组件
  handleUnSelected: () => void;
}

interface MoveItemProps extends React.HTMLProps<HTMLDivElement> {
  lock?: boolean; // 是否锁定(锁定只能通过右键菜单操作，不能左键选中)
  onChangeUpdateMoveInfo: (moveInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void; // 大小位置信息更新
}

const MoveItem = React.forwardRef((props: MoveItemProps, ref: ForwardedRef<MoveItemRefType>) => {
  const { className, onChangeUpdateMoveInfo, lock, ...rest } = props;
  const containerDomRef = useRef<HTMLDivElement>(null);
  const boxDomRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      containerDom: containerDomRef.current!,
      handleSelected() {
        setIsSelected(true);
      },
      handleUnSelected() {
        setIsSelected(false);
      },
    };
  });

  // 注册拖拽位移
  useItemDragMove(containerDomRef, { lock });

  // 注册拖拽大小
  useItemDragSize(containerDomRef, {
    onChange: onChangeUpdateMoveInfo,
    isSelected,
    lock,
  });

  // 注册右键菜单
  useItemContextMenu(containerDomRef);

  return (
    <div {...rest} className={classNames(className, styles.moveItem)} ref={containerDomRef}>
      {/* children */}
      {props?.children}

      {/* 遮罩层 */}
      <div
        className={classNames(
          styles.moveItem_box,
          isSelected && styles.moveItem_box_selected,
          lock && styles.moveItem_box_lock,
        )}
        ref={boxDomRef}
      />
    </div>
  );
});

export default MoveItem;
