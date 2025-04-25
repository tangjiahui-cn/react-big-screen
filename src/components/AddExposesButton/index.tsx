/**
 * AddExposesButton
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import engine, { ExposeItemType, INIT_EXPOSE_LIST } from "@/engine";
import styles from "./index.module.less";
import { IInput } from "@/components/Attributes/base/IInput";
import IEmpty from "@/components/IEmpty";
import CustomDropDown from "@/components/CustomDropDown";

interface Item {
  label: string;
  value: string;
}

interface Props {
  cId?: string; // 组件id
  beforeVisible?: (items: Item[]) => Item[]; // 在显示之前过滤items
  onSelect?: (item: Item) => void; // 选中回调
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function AddExposesButton(props: Props) {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const timerIdRef = useRef<any>();

  const filterItems = useMemo(() => {
    const keywordLowerCase = keyword?.toLowerCase?.();
    return items.filter((item) => item?.label?.toLowerCase?.()?.includes?.(keywordLowerCase));
  }, [keyword, items]);

  function handleClose() {
    setVisible(false);
  }

  useEffect(() => {
    if (visible) {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      let items: ExposeItemType[] = [];
      if (props?.cId) {
        const component = engine.component.get(props?.cId);

        items = (component?.exposes || [])?.reduce(
          (list, expose) => {
            list.push({ label: expose.label, value: expose.value });
            return list;
          },
          [...INIT_EXPOSE_LIST],
        );
      }
      if (props?.beforeVisible) {
        items = props?.beforeVisible(items);
      }
      setItems(items);
      setKeyword("");
    }
  }, [visible]);

  return (
    <CustomDropDown
      visible={visible}
      onClose={handleClose}
      overlayChildren={
        <div className={styles.addExposesButton}>
          <IInput placeholder={"搜索组件操作"} value={keyword} onChange={setKeyword} />
          <div className={styles.addExposesButton_body}>
            {!filterItems?.length && <IEmpty />}
            {filterItems?.map?.((item) => {
              return (
                <div
                  key={item?.value}
                  className={styles.addExposesButton_item}
                  title={item?.label}
                  onClick={() => {
                    props?.onSelect?.(item);
                    handleClose();
                  }}
                >
                  <div className={styles.addExposesButton_item_text}>{item?.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      }
    >
      <div style={{ width: "100%", ...props?.style }} onClick={() => setVisible(true)}>
        <Button
          block
          onClick={() => handleClose()}
          style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
          icon={<PlusOutlined />}
        >
          {props?.children || "新增操作"}
        </Button>
      </div>
    </CustomDropDown>
  );
}
