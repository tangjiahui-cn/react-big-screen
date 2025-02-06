/**
 * ComponentNodeItem
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import engine, { ComponentNodeType } from "@/engine";
import classNames from "classnames";
import ComponentNodeImage from "@/components/ComponentNodeImage";
import { LockOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isKeyPressed } from "@/packages/shortCutKeys";
import { useItemContextMenu } from "@/pages/components/Editor/components/RenderComponentNode/hooks";
import { isClickMouseLeft } from "@/utils";

interface Props {
  componentNode: ComponentNodeType;
  isSelected?: boolean;
}

export default function ComponentNodeItem(props: Props) {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [componentNode, setComponentNode] = useState(props?.componentNode);

  const { component, instance } = useMemo(() => {
    return {
      component: engine.component.get(componentNode?.cId),
      instance: engine.instance.get(componentNode?.id),
    };
  }, [componentNode]);

  function handleClick(e: React.MouseEvent) {
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

  // 监听对应实例的componentNode变化
  useEffect(() => {
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  // 注册右键菜单
  useItemContextMenu(domRef);

  return (
    <div
      ref={domRef}
      className={classNames(
        styles.componentNodeItem,
        props?.isSelected && styles.componentNodeItem_selected,
      )}
      onMouseDown={(e) => {
        handleClick(e);
      }}
      onMouseEnter={() => {
        instance?.handleHover?.();
      }}
      onMouseLeave={() => {
        instance?.handleUnHover?.();
      }}
    >
      <div className={styles.componentNodeItem_icon}>
        <ComponentNodeImage src={component?.icon} style={{ height: "75%" }} />
      </div>
      <div className={styles.componentNodeItem_name}>{componentNode?.name}</div>
      <div className={styles.componentNodeItem_tail}>
        {componentNode?.lock ? <LockOutlined /> : ""}
      </div>
    </div>
  );
}
