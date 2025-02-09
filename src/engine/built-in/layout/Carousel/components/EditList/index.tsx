/**
 * 编辑列表
 *
 * @author tangjiahui
 * @date 2025/2/9
 */
import { PanelData } from "@/engine";
import styles from "./index.module.less";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createUUID } from "@/engine/utils";
import Item from "./item";
import React from "react";
import classNames from "classnames";

interface Props {
  value?: string; // 选中值
  list?: PanelData[]; // 列表
  onChange?: (list: PanelData[]) => void; // 回调列表
  onSelect?: (value: string) => void; // 选中
  style?: React.CSSProperties;
  className?: string;
}

export default function EditorList(props: Props) {
  const { value, onSelect, list = [], onChange } = props;

  function handleDelete(key: string) {
    // 至少保留一个数据
    if (list.length <= 1) {
      message.warn("至少保留一个面板");
      return;
    }
    const targetList = list?.filter?.((item) => item.value !== key) || [];
    if (value === key) {
      onSelect?.(targetList?.[0]?.value);
    }
    onChange?.(targetList);
  }

  function handleAdd() {
    const targetList = [
      ...list,
      {
        label: `面板${list.length}`,
        value: createUUID(),
      },
    ];
    onChange?.(targetList);
  }

  function handleUpdate(source: PanelData, update: PanelData) {
    Object.assign(source, update);
    onChange?.([...list]);
  }

  return (
    <div className={classNames(styles.editList, props?.className)} style={props?.style}>
      {list?.map?.((item) => {
        return (
          <Item
            key={item?.value}
            value={item}
            isSelected={item.value === value}
            onSelect={() => {
              onSelect?.(item.value);
            }}
            onDelete={() => {
              handleDelete(item.value);
            }}
            onUpdate={(panel) => {
              handleUpdate(item, panel);
            }}
          />
        );
      })}
      <Button
        size={"small"}
        type={"dashed"}
        block
        icon={<PlusOutlined />}
        style={{ marginTop: 4 }}
        onClick={() => handleAdd()}
      >
        新增
      </Button>
    </div>
  );
}
