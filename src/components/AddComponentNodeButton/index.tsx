/**
 * AddComponentNodeButton
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import { Button, Dropdown, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComponentNodeType } from "@/engine";
import styles from "./index.module.less";
import { IInput } from "@/components/Attributes/base/IInput";
import ComponentNodeImage from "@/components/ComponentNodeImage";
import IEmpty from "@/components/IEmpty";
import RenderPopover from "@/components/AddComponentNodeButton/RenderPopover";
import { useEngineContext } from "@/export/context";

interface Props {
  style?: React.CSSProperties;
  beforeVisible?: (items: ComponentNodeType[]) => ComponentNodeType[]; // 在显示之前过滤items
  children?: React.ReactNode;
  onSelect?: (componentNode: ComponentNodeType) => void;
}
export default function AddComponentNodeButton(props: Props) {
  const { engine } = useEngineContext();
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<ComponentNodeType[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const timerIdRef = useRef<any>();

  useEffect(() => {
    if (visible) {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      let items = engine.componentNode.getAll();
      if (props?.beforeVisible) {
        items = props?.beforeVisible(items);
      }
      setItems(items);
      setKeyword("");
    }
  }, [visible]);

  const filterItems = useMemo(() => {
    const keywordLowerCase = keyword?.toLowerCase?.();
    return items.filter((item) => item?.name?.toLowerCase?.()?.includes?.(keywordLowerCase));
  }, [keyword, items]);

  function handleClose() {
    setVisible(false);
    // 完全关闭后再置空
    timerIdRef.current = setTimeout(() => {
      setItems([]);
      timerIdRef.current = null;
    }, 300);
  }

  function handleSelect(componentNode: ComponentNodeType) {
    props?.onSelect?.(componentNode);
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
              <div className={styles.addComponentNodeButton}>
                <IInput placeholder={"搜索页面组件"} value={keyword} onChange={setKeyword} />
                <div className={styles.addComponentNodeButton_body}>
                  {!filterItems?.length && <IEmpty />}
                  {filterItems?.map?.((componentNode: ComponentNodeType) => {
                    const component = engine.component.get(componentNode?.cId);
                    return (
                      <Popover
                        key={componentNode?.id}
                        content={<RenderPopover componentNode={componentNode} />}
                        placement={"right"}
                      >
                        <div
                          className={styles.addComponentNodeButton_item}
                          title={componentNode?.name}
                          onClick={() => handleSelect(componentNode)}
                        >
                          <ComponentNodeImage
                            src={component?.icon}
                            style={{ maxHeight: 20, maxWidth: 20 }}
                          />
                          <div className={styles.addComponentNodeButton_item_text}>
                            {componentNode?.name}
                          </div>
                        </div>
                      </Popover>
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
