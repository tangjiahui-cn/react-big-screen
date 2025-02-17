/**
 * 编辑列表
 *
 * @author tangjiahui
 * @date 2025/2/9
 */
import engine, { PanelData } from "@/engine";
import styles from "./index.module.less";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createUUID } from "@/engine/utils";
import Item from "./item";
import React from "react";
import classNames from "classnames";
import { useAsk } from "@/components/Ask";

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
  const ask = useAsk();

  // 仅删除面板
  function handleDeletePanel(key: string) {
    const targetList = list?.filter?.((item) => item.value !== key) || [];
    if (value === key) {
      onSelect?.(targetList?.[0]?.value);
    }
    onChange?.(targetList);
  }

  // 删除操作
  function handleDelete(key: string) {
    // 至少保留一个数据
    if (list.length <= 1) {
      message.warn("至少保留一个面板");
      return;
    }

    // 当前面板如果有组件，则提示
    const containChildrenIds = engine.componentNode.getPanelChildrenIds(key);
    if (containChildrenIds?.length) {
      ask({
        title: "提醒",
        content: `该面板下包含${containChildrenIds?.length}个组件，确定删除？`,
        onOk(close) {
          // 删除面板
          handleDeletePanel(key);
          // 删除包含的组件
          engine.componentNode.delete(containChildrenIds);
          close();
        },
      });
    } else {
      handleDeletePanel(key);
    }
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
