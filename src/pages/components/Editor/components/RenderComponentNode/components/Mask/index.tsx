/**
 * Mask
 *
 * @author tangjiahui
 * @date 2025/3/20
 */
import { ComponentNodeType, DATASET } from "@/engine";
import classNames from "classnames";
import styles from "./index.module.less";
import { DRAG_DIRECTIONS } from "@/pages/components/Editor/hooks/useRegisterDrag/listenDragSize";
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

export type MaskRefType = {
  handleHover: () => void;
  handleUnHover: () => void;
  handleSelected: () => void;
  handleUnSelected: () => void;
};

interface Props {
  componentNode: ComponentNodeType;
}

export default forwardRef((props: Props, ref: ForwardedRef<MaskRefType>) => {
  const { componentNode } = props;
  const boxDomRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      // 经过实例
      handleHover() {
        boxDomRef.current?.classList?.add?.(styles.moveItem_box_hover);
      },
      // 离开实例
      handleUnHover() {
        boxDomRef.current?.classList?.remove?.(styles.moveItem_box_hover);
      },
      // 选中实例样式
      handleSelected() {
        // 内部样式选中
        setIsSelected(true);
      },
      // 取消选中实例样式
      handleUnSelected() {
        // 移除内部样式选中
        setIsSelected(false);
      },
    };
  });

  return useMemo(() => {
    return (
      <div
        {...{
          [`data-${DATASET.componentNodeId}`]: componentNode.id,
        }}
        ref={boxDomRef}
        className={classNames(
          styles.moveItem_box,
          isSelected && styles.moveItem_box_selected,
          componentNode.lock && styles.moveItem_box_lock,
        )}
      >
        {/* 选中，且未锁定状态，显示拖拽大小的定位圆点 */}
        {isSelected &&
          !componentNode.lock &&
          DRAG_DIRECTIONS.map((direction) => (
            <div
              key={direction}
              className={styles[`dragPoint_${direction}`]}
              {...{
                [`data-${DATASET.dragDirection}`]: direction,
              }}
            />
          ))}
      </div>
    );
  }, [componentNode.lock, isSelected]);
});
