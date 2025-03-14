/**
 * Attributes
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import { useMemo } from "react";
import { useSelectedInstances } from "@/engine";
import SingleInstanceAttributes from "./components/SingleInstanceAttributes";
import MultipleInstanceAttributes from "./components/MultipleInstanceAttributes";
import PageAttributes from "./components/PageAttributes";

export default function Attributes() {
  const selectedInstances = useSelectedInstances();
  const isSelected = useMemo(() => !!selectedInstances.length, [selectedInstances]);
  const isSingleInstance = useMemo(() => selectedInstances.length === 1, [selectedInstances]);
  return (
    <div className={styles.attributes}>
      {isSelected ? (
        // 选中组件实例配置
        <>
          {/* 单实例配置 */}
          {isSingleInstance && <SingleInstanceAttributes instance={selectedInstances[0]} />}
          {/* 多实例配置 */}
          {!isSingleInstance && <MultipleInstanceAttributes instances={selectedInstances} />}
        </>
      ) : (
        // 默认页面配置
        <PageAttributes />
      )}
    </div>
  );
}
