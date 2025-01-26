/**
 * 拖拽组件
 *
 * @author tangjiahui
 * @date 2025/1/8
 * @description 用于改变组件的x、y、width、height。
 */
import React, { ForwardedRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import engine, { InstanceType } from "@/engine";
import { useContextMenu, ContextMenuItem } from "../../../../../../../packages/contextMenu";
import {
  dragDirectionMapToCursor,
  dragMoveSize,
  moveableDom,
} from "../../../../../../../packages/dragMove";
import { createContextMenu } from "../../data/contextMenuItems";
import globalCursor from "../../../../../../../packages/globalCursor";

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

  // todo: 后续优化（已知问题，同时选中一百以上组件会内存溢出）
  // 拖拽位移
  useEffect(() => {
    if (lock) return;

    const currentDOM = containerDomRef.current;
    if (!currentDOM) return;

    // 选中实例列表
    let selectedInstanceList: InstanceType[] = [];
    // 是否启用transform（启用则开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint）
    let enableTransform = false;
    const unmountMoveableDom = moveableDom(currentDOM, {
      onStart(e) {
        e.stopPropagation();
        // 修改全局光标
        globalCursor.set("move");
        // 等待选中时设置选中实例后，再获取
        setTimeout(() => {
          selectedInstanceList = engine.instance.getAllSelected();
          // 不超过50个组件使用transform，避免内存溢出（使用了transform会流畅，代价是占用内存）
          enableTransform = selectedInstanceList.length < 50;
        });
      },
      onMove(deltaX: number, deltaY: number) {
        selectedInstanceList.forEach((instance: InstanceType) => {
          if (enableTransform) {
            instance.getContainerDom().style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
          } else {
            const componentNode = instance.getComponentNode();
            const dom = instance.getContainerDom();
            dom.style.left = `${componentNode.x + deltaX}px`;
            dom.style.top = `${componentNode.y + deltaY}px`;
          }
        });
      },
      onEnd(deltaX: number, deltaY: number) {
        // 恢复全局光标
        globalCursor.revoke();
        selectedInstanceList.forEach((instance) => {
          // 删除 transform
          if (enableTransform) {
            instance.getContainerDom().style.removeProperty("transform");
          }
          // 更新 componentNode
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(componentNode.id, {
              x: deltaX + (componentNode?.x || 0),
              y: deltaY + (componentNode?.y || 0),
            });
          }
        });
      },
    });

    // unmount
    return () => {
      unmountMoveableDom();
    };
  }, [lock]);

  // todo: 后续优化（已知问题，同时选中一百以上组件会内存溢出）
  // 拖拽大小
  useEffect(() => {
    if (!isSelected || lock) {
      return;
    }
    const dom = containerDomRef.current!;
    let baseInfo = {
      x: 0,
      y: 0,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
    };
    return dragMoveSize(dom, {
      onStart(direction) {
        // 修改全局光标
        globalCursor.set(dragDirectionMapToCursor[direction]);
        baseInfo = {
          x: dom.offsetLeft,
          y: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
        };
        dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      },
      onMove(moveInfo) {
        const width = baseInfo.width + moveInfo.dw;
        const height = baseInfo.height + moveInfo.dh;
        if (width < 0 || height < 0) return;
        onChangeUpdateMoveInfo?.({
          x: baseInfo.x + moveInfo.dx,
          y: baseInfo.y + moveInfo.dy,
          height: Math.max(height, 0),
          width: Math.max(width, 0),
        });
      },
      onEnd() {
        // 恢复全局光标
        globalCursor.revoke();
      },
    });
  }, [isSelected, lock]);

  // todo: 后续优化（已知问题，同时选中一百以上组件会内存溢出）
  // 绑定右键菜单
  const contextMenuItems: ContextMenuItem[] = useMemo(() => createContextMenu(), []);
  useContextMenu(containerDomRef, contextMenuItems, {
    onBeforeOpen(menuItems) {
      // 判断选中组件 锁定/解锁
      let lockCount = 0;
      const allSelectedInstances = engine.instance.getAllSelected();
      const allSelectedComponents = allSelectedInstances.map((ins) => {
        const componentNode = engine.componentNode.get(ins.id);
        if (componentNode?.lock) {
          lockCount++;
        }
        return componentNode;
      });
      if (allSelectedComponents.length) {
        return menuItems.filter((menuItem) => {
          if (menuItem.key === "lock") return lockCount !== allSelectedComponents.length;
          if (menuItem.key === "unlock") return !!lockCount;
          return true;
        });
      }
      return menuItems;
    },
  });

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
