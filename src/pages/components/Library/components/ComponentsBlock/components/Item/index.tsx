/**
 * Component Item
 *
 * @author tangjiahui
 * @date 2024/12/15
 */
import styles from "./index.module.less";
import { ComponentType } from "@/engine";
import classNames from "classnames";
import { useRef } from "react";
import { useVirtualDrag } from "@/packages/virtual-drag";

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
        {component.icon ? <img src={component.icon} draggable={false} /> : <span>None</span>}
      </div>
      <div className={styles.componentItem_footer}>{component.cName}</div>
    </div>
  );
}
