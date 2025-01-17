/**
 * 拖拽组件
 *
 * @author tangjiahui
 * @date 2025/1/8
 * @description 用于改变组件的x、y、width、height。
 */
import React, { ForwardedRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import engine, { InstanceType } from "@/engine";
import { useEffectOnce } from "@/hooks";
import { useContextMenu, ContextMenuItem } from "@/contextMenu";
import { dragMoveSize, moveableDom } from "@/dragMove";

export interface MoveItemRefType {
  // 容器dom
  containerDom: HTMLDivElement;
  // 选中组件
  handleSelected: () => void;
  // 取消选中组件
  handleUnSelected: () => void;
}

interface MoveItemProps extends React.HTMLProps<HTMLDivElement> {
  contextMenuItems?: ContextMenuItem[]; // 右键菜单配置项
  onSelectContextMenu?: (key: string) => void; // 右键菜单选中回调
  onChangeUpdateMoveInfo: (moveInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void; // 大小位置信息更新
}

const MoveItem = React.forwardRef((props: MoveItemProps, ref: ForwardedRef<MoveItemRefType>) => {
  const { className, contextMenuItems, onSelectContextMenu, onChangeUpdateMoveInfo, ...rest } =
    props;
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

  // 拖拽位移
  useEffectOnce(() => {
    const currentDOM = containerDomRef.current;
    if (!currentDOM) return;

    // 给当前dom增加拖拽支持
    let selectedContainerDomList: HTMLDivElement[] = [];
    let selectedInstanceList: InstanceType[] = [];
    const unmountMoveableDom = moveableDom(currentDOM, {
      onStart() {
        // 等待选中时设置选中实例后，再获取
        setTimeout(() => {
          selectedInstanceList = engine.instance.getAllSelected();
          selectedContainerDomList = selectedInstanceList.map((x) => x.getContainerDom());
        });
      },
      onMove(deltaX: number, deltaY: number) {
        selectedContainerDomList.forEach((dom: HTMLDivElement) => {
          // 开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint。
          dom.style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
        });
      },
      onEnd(deltaX: number, deltaY: number) {
        selectedInstanceList.forEach((instance, index) => {
          // 删除 transform
          selectedContainerDomList[index].style.removeProperty("transform");
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
  });

  // 拖拽大小
  useEffect(() => {
    if (!isSelected) {
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
      onMoveStart() {
        baseInfo = {
          x: dom.offsetLeft,
          y: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
        };
        dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      },
      onMove(moveInfo) {
        onChangeUpdateMoveInfo?.({
          x: baseInfo.x + moveInfo.dx,
          y: baseInfo.y + moveInfo.dy,
          height: baseInfo.height + moveInfo.dh,
          width: baseInfo.width + moveInfo.dw,
        });
      },
    });
  }, [isSelected]);

  // 绑定右键菜单
  useContextMenu(containerDomRef, contextMenuItems, {
    onSelect(key) {
      onSelectContextMenu?.(key);
    },
  });

  return (
    <div {...rest} className={classNames(className, styles.moveItem)} ref={containerDomRef}>
      {/* children */}
      {props?.children}

      {/* 遮罩层 */}
      <div
        className={classNames(styles.moveItem_box, isSelected && styles.moveItem_box_selected)}
        ref={boxDomRef}
      />
    </div>
  );
});

export default MoveItem;
