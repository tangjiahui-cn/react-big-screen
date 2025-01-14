/**
 * Attributes
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import { useMemo } from "react";
import { useSelectedInstances } from "@/engine";
import EmptyAttributes from "./components/EmptyAttributes";
import SingleInstanceAttributes from "./components/SingleInstanceAttributes";
import MultipleInstanceAttributes from "./components/MultipleInstanceAttributes";

export default function Attributes() {
  const selectedInstances = useSelectedInstances();
  const isSelected = useMemo(() => !!selectedInstances.length, [selectedInstances]);
  const isSingleInstance = useMemo(() => selectedInstances.length === 1, [selectedInstances]);

  return (
    <div className={styles.attributes}>
      {/* Empty */}
      {!isSelected && <EmptyAttributes />}
      {/* 选中配置 */}
      {isSelected && (
        <>
          {/* 单实例配置 */}
          {isSingleInstance && <SingleInstanceAttributes instance={selectedInstances[0]} />}
          {/* 多实例配置 */}
          {!isSingleInstance && <MultipleInstanceAttributes />}
        </>
      )}
    </div>
  );
}
