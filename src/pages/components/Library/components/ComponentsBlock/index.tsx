/**
 * ComponentsBlock
 *
 * @author tangjiahui
 * @date 2025/1/21
 * @description 渲染一组components
 */
import { ComponentType } from "@/engine";
import styles from "./index.module.less";
import Item from "./components/Item";
import IEmpty from "@/components/IEmpty";
import { useMemo } from "react";

interface ComponentsBlockProps {
  column?: number; // 列数
  components: ComponentType[];
}

export default function ComponentsBlock(props: ComponentsBlockProps) {
  const { components, column = 3 } = props;
  const { width, lines } = useMemo(() => {
    return {
      width: `${100 / column}%`,
      lines: Math.ceil(components.length / column),
    };
  }, [components, column]);

  return (
    <div className={styles.componentsBlock}>
      {!components?.length && <IEmpty description={"暂无组件"} />}
      {components?.map?.((component: ComponentType, index: number) => {
        const isLineEnd: boolean = index % column === column - 1;
        const isLastLine: boolean = lines === 1 || index > (lines - 1) * column - 1;
        return (
          <Item
            key={component.cId}
            component={component}
            style={{
              width,
              borderRight: isLineEnd ? "none" : "1px solid #e7e7e7",
              borderBottom: isLastLine ? "none" : "1px solid #e7e7e7",
            }}
          />
        );
      })}
    </div>
  );
}
