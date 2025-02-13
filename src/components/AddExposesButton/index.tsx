/**
 * AddExposesButton
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import { Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import engine, { INIT_EXPOSES } from "@/engine";
import styles from "./index.module.less";
import { IInput } from "@/components/Attributes/base/IInput";
import IEmpty from "@/components/IEmpty";

interface Item {
  label: string;
  value: string;
}

interface Props {
  cId?: string;
  beforeVisible?: (items: Item[]) => Item[]; // 在显示之前过滤items
  children?: React.ReactNode;
  onSelect?: (item: Item) => void;
  style?: React.CSSProperties;
}
export default function AddExposesButton(props: Props) {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const timerIdRef = useRef<any>();

  useEffect(() => {
    if (visible) {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      let items = [...INIT_EXPOSES];
      if (props?.cId) {
        engine.component.get(props?.cId)?.exposes?.forEach?.((expose) => {
          items.push({ label: expose.label, value: expose.value });
        });
      }
      if (props?.beforeVisible) {
        items = props?.beforeVisible(items);
      }
      setItems(items);
      setKeyword("");
    }
  }, [visible]);

  const filterItems = useMemo(() => {
    const keywordLowerCase = keyword?.toLowerCase?.();
    return items.filter((item) => item?.label?.toLowerCase?.()?.includes?.(keywordLowerCase));
  }, [keyword, items]);

  function handleClose() {
    setVisible(false);
    // 完全关闭后再置空
    timerIdRef.current = setTimeout(() => {
      setItems([]);
      timerIdRef.current = null;
    }, 300);
  }

  function handleSelect(item: Item) {
    props?.onSelect?.(item);
    handleClose();
  }

  return (
    <Dropdown
      overlayClassName={styles.dropdown_overlay}
      menu={{
        items: [
          {
            key: "body",
            label: (
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
                        onClick={() => handleSelect(item)}
                      >
                        <div className={styles.addExposesButton_item_text}>{item?.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
          },
        ],
      }}
      trigger={["click"]}
      open={visible}
      onOpenChange={(visible) => {
        if (!visible) {
          handleClose();
        }
      }}
    >
      <div style={{ width: "100%", ...props?.style }}>
        <Button
          block
          onClick={() => !visible && setVisible(true)}
          style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
          icon={<PlusOutlined />}
        >
          {props?.children || "新增组件"}
        </Button>
      </div>
    </Dropdown>
  );
}
