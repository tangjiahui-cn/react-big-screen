/**
 * ComponentNodes
 *
 * @author tangjiahui
 * @date 2025/2/5
 * @description 页面组件列表
 */
import styles from "./index.module.less";
import engine, { ComponentNodeType, useComponentNodes, useSelectedInstances } from "@/engine";
import { useMemo } from "react";
import ComponentNodeItem from "./components/ComponentNodeItem";
import IEmpty from "@/components/IEmpty";
import { unSelectAllComponentNodes } from "@/packages/shortCutKeys";

export default function () {
  // 全部页面组件
  const componentNodes = useComponentNodes();
  // 选中实例（用于触发页面更新）
  const selectedInstances = useSelectedInstances();

  // 渲染页面组件列表
  const renderComponentNodes = useMemo(() => {
    return componentNodes.length ? (
      <div className={styles.componentNodes_block}>
        {componentNodes.map((componentNode: ComponentNodeType) => {
          return (
            <ComponentNodeItem
              key={componentNode.id}
              componentNode={componentNode}
              isSelected={engine.instance.isSelected(componentNode.id)}
            />
          );
        })}
      </div>
    ) : (
      <></>
    );
  }, [componentNodes, selectedInstances]);

  return (
    <div className={styles.componentNodes} onMouseDown={() => unSelectAllComponentNodes()}>
      {!componentNodes.length && <IEmpty />}
      {renderComponentNodes}
    </div>
  );
}
