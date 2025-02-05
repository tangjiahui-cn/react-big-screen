/**
 * Component Item
 *
 * @author tangjiahui
 * @date 2024/12/15
 */
import styles from "./index.module.less";
import { ComponentType } from "@/engine";
import classNames from "classnames";
import React, { useRef } from "react";
import { useVirtualDrag } from "@/packages/virtual-drag";
import ComponentNodeImage from "@/components/ComponentNodeImage";

interface Props {
  style?: React.CSSProperties;
  className?: string;
  component: ComponentType;
}

export default function (props: Props) {
  const { component } = props;
  const domRef = useRef<HTMLDivElement>(null);

  useVirtualDrag(domRef, {
    type: "create-component",
    data: {
      component,
    },
  });

  return (
    <div
      style={props?.style}
      className={classNames(styles.componentItem, props?.className)}
      ref={domRef}
    >
      <div className={styles.componentItem_body}>
        <ComponentNodeImage src={component.icon} style={{ maxWidth: "50%", maxHeight: "50%" }} />
      </div>
      <div className={styles.componentItem_footer}>{component.cName}</div>
    </div>
  );
}
