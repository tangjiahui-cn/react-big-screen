/**
 * ComponentNodeItem
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import engine, { ComponentNodeType, DATASET } from "@/engine";
import classNames from "classnames";
import ComponentNodeImage from "@/components/ComponentNodeImage";
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isKeyPressed } from "@/packages/shortCutKeys";
import { isClickMouseLeft } from "@/utils";

interface Props {
  componentNode: ComponentNodeType;
  isSelected?: boolean;
}

export default function ComponentNodeItem(props: Props) {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [componentNode, setComponentNode] = useState(props?.componentNode);
  const show = componentNode?.show ?? true;

  const { component, instance } = useMemo(() => {
    return {
      component: engine.component.get(componentNode?.cId),
      instance: engine.instance.get(componentNode?.id),
    };
  }, [componentNode]);

  // 选中当前
  function handleSelect(e: React.MouseEvent) {
    e.stopPropagation();
    // 按住shift支持取消选中该项
    const isPressedShift = isKeyPressed("shift");
    // 如果已选中
    if (engine.instance.isSelected(componentNode.id)) {
      // 仅点击鼠标左键可进行其他操作
      if (!isClickMouseLeft(e.nativeEvent)) {
        return;
      }
      if (isPressedShift) {
        // 如果按住shift，则取消选中该项
        engine.instance.unselect(componentNode.id);
      } else {
        // 否则，只选中该项
        engine.instance.select(componentNode?.id, true);
      }
      return;
    }
    // 未选中，点击则直接选中
    engine.instance.select(componentNode?.id, !isPressedShift);
  }

  // 切换可见
  function handleShow(visible: boolean) {
    engine.componentNode.update(componentNode.id, {
      show: visible,
    });
  }

  // 监听对应实例的componentNode变化
  useEffect(() => {
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  return (
    <div
      {...{
        [`data-${DATASET.componentNodeId}`]: componentNode.id,
      }}
      ref={domRef}
      className={classNames(
        styles.componentNodeItem,
        props?.isSelected && styles.componentNodeItem_selected,
      )}
      onMouseDown={(e) => {
        handleSelect(e);
      }}
      onMouseEnter={() => {
        instance?.handleHover?.();
      }}
      onMouseLeave={() => {
        instance?.handleUnHover?.();
      }}
    >
      <div className={styles.componentNodeItem_icon}>
        <ComponentNodeImage src={component?.icon} style={{ height: "75%", maxWidth: "100%" }} />
      </div>
      <div className={styles.componentNodeItem_name}>{componentNode?.name}</div>
      <div className={styles.componentNodeItem_tail}>
        <div>{componentNode?.lock ? <LockOutlined /> : ""}</div>
        <div
          className={styles.componentNodeItem_tail_operatable}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleShow(!show);
          }}
        >
          {show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </div>
      </div>
    </div>
  );
}
