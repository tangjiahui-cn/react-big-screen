/**
 * 导航子项
 *
 * @author tangjiahui
 * @date 2025/2/27
 */
import styles from "./index.module.less";
import classNames from "classnames";

export interface NavItemType {
  value: string; // id
  label: string; // 名称
  parent?: string; // 父id
  children?: NavItemType[]; // 子项
}

interface Props {
  // 列表
  list: NavItemType[];
  // 选中keys
  selectedKeys: string[];
  // 点击回调
  onSelect?: (value: string) => void;
}

export default function NavLine(props: Props) {
  const { list, selectedKeys } = props;
  const isLast = selectedKeys.length <= 1;
  let children: NavItemType[] | undefined;

  const renderChildren = (
    <div className={styles.navLine_inner}>
      {list.map((item) => {
        const isSelected = item.value === selectedKeys[0];
        if (isSelected) children = item?.children;
        return (
          <div
            key={item?.value}
            className={classNames(
              styles.navItem,
              isSelected && isLast && styles.navItem_selected,
              isSelected && isLast && styles.navItem_last,
            )}
            onClick={() => {
              props?.onSelect?.(item?.value);
            }}
          >
            {item?.label}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={styles.navLine}>{renderChildren}</div>
      {!!children?.length && (
        <NavLine list={children} selectedKeys={selectedKeys.slice(1)} onSelect={props?.onSelect} />
      )}
    </>
  );
}
