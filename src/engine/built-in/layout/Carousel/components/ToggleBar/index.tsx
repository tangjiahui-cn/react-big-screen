/**
 * ToggleBar
 *
 * @author tangjiahui
 * @date 2025/3/11
 * @description 切换栏
 */
import styles from "./index.module.less";
import { useMemo } from "react";
import classNames from "classnames";

interface Props {
  count?: number; // 数量
  value?: number; // 当前索引位置(从0开始)
  onChange?: (value: number) => void; // 切换回调
}

export default function ToggleBar(props: Props) {
  const { count = 1, value = 0 } = props;

  const renderChildren = useMemo(() => {
    return Array(count)
      .fill(null)
      .map((_, index) => {
        const isSelected = value === index;
        return (
          <div
            key={`${index}-${count}`}
            className={classNames(
              styles.toggleBar_rect,
              isSelected && styles.toggleBar_rect_selected,
            )}
            onClick={() => {
              props?.onChange?.(index);
            }}
          />
        );
      });
  }, [count, value]);

  return <div className={styles.toggleBar}>{renderChildren}</div>;
}
