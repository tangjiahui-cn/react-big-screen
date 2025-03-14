/**
 * EditSeriesList
 *
 * @author tangjiahui
 * @date 2025/3/14
 * @description 编辑数据配置。
 */
import styles from "./index.module.less";
import TabsHead from "@/components/TabsHead";
import { useMemo } from "react";
import { createUUID } from "@/engine";
import { useStateWithRef } from "@/hooks";
import IEmpty from "@/components/IEmpty";
import Item from "./Item";

export interface SeriesItem {
  key: string; // 唯一key
  name?: string; // 数据名称
  value?: string; // 映射字段
  color?: string; // 颜色
}

interface Props {
  value?: SeriesItem[];
  onChange?: (series: SeriesItem[]) => void;
}

export default function EditSeriesList(props: Props) {
  const { value = [] } = props;
  const [activeKey, setActiveKey, activeKeyRef] = useStateWithRef<string>("");

  const items = useMemo(() => {
    const list =
      props?.value?.map?.((x: SeriesItem) => {
        return {
          label: x.name || "",
          value: x.key || x?.value || "",
          data: x,
        };
      }) || [];
    if (list.length) {
      const find = list.some((x) => x.value === activeKeyRef.current);
      if (!find) {
        setActiveKey(list[0].value);
      }
    }
    return list;
  }, [props?.value]);

  const currentItem: SeriesItem | undefined = useMemo(() => {
    return items?.find?.((x) => x?.value === activeKey)?.data;
  }, [items, activeKey]);

  // 新增一条数据
  function handleAdd() {
    props?.onChange?.([
      ...value,
      {
        key: createUUID(4),
        name: `数据${value.length + 1}`,
        value: undefined,
        color: "white",
      } as SeriesItem,
    ]);
  }

  // 删除一条数据
  function handleDelete(value: string) {
    const result = items?.reduce((list, item) => {
      if (item.value !== value) {
        list.push(item.data);
      }
      return list;
    }, [] as SeriesItem[]);
    props?.onChange?.(result);
  }

  // 更新一条数据
  function handleUpdate(item: SeriesItem) {
    value?.some?.((current) => {
      const isFind = current.key === item.key;
      if (isFind) {
        Object.assign(current, item);
      }
      return isFind;
    });
    props?.onChange?.([...value]);
  }

  return (
    <div className={styles.editSeriesList}>
      <TabsHead
        showAdd
        showDelete
        value={activeKey}
        items={items}
        onChange={setActiveKey}
        onAdd={handleAdd}
        onDelete={(value) => {
          handleDelete(value);
        }}
      />

      {!currentItem && <IEmpty />}
      {currentItem && (
        <Item
          value={currentItem}
          onChange={(item) => {
            handleUpdate(item);
          }}
        />
      )}
    </div>
  );
}
