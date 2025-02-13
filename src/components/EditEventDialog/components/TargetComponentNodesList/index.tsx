/**
 * 目标组件列表
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import styles from "./index.module.less";
import React, { useMemo } from "react";
import classNames from "classnames";
import engine, { ComponentNodeEventTarget, ComponentNodeType } from "@/engine";
import IEmpty from "@/components/IEmpty";
import AddComponentNodeButton from "@/components/AddComponentNodeButton";
import { DeleteOutlined } from "@ant-design/icons";
import { ask } from "@/components/Ask";

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
  targets?: ComponentNodeEventTarget[];
  style?: React.CSSProperties;
  className?: string;
  onChangeTargets: (value: ComponentNodeEventTarget[]) => void;
}

export default function TargetComponentNodesList(props: Props) {
  const list = useMemo(() => {
    return props?.targets?.map?.((target) => {
      return {
        value: target.id,
        label: engine.componentNode.get(target?.id)?.name,
      };
    });
  }, [props?.targets]);

  function handleAdd(componentNode: ComponentNodeType) {
    const newTargets = [
      ...(props?.targets || []),
      {
        id: componentNode.id,
        opts: [],
      },
    ];
    props?.onChangeTargets?.(newTargets);
  }

  function handleDelete(id: string) {
    let deleteTarget: ComponentNodeEventTarget | undefined;
    const filterTargets =
      props?.targets?.filter?.((target) => {
        if (target.id === id) {
          deleteTarget = target;
          return false;
        }
        return true;
      }) || [];
    const count = deleteTarget?.opts?.length || 0;

    function ensureDelete() {
      props?.onChangeTargets?.(filterTargets);
      if (id === props?.value) {
        props?.onChange?.(filterTargets?.[0]?.id);
      }
    }

    // 删除二次确认
    if (count) {
      ask({
        title: "提醒",
        content: `该组件已配置 ${count} 个事件操作，确定删除？`,
        onOk(close) {
          ensureDelete();
          close();
        },
      });
      return;
    }

    ensureDelete();
  }

  return (
    <div className={classNames(styles.targetList, props?.className)} style={props?.style}>
      <AddComponentNodeButton
        style={{ margin: -1 }}
        beforeVisible={(items) => {
          return items.filter((item) => {
            return !props?.targets?.find?.((target) => target.id === item?.id);
          });
        }}
        onSelect={(componentNode) => handleAdd(componentNode)}
      >
        新增目标组件
      </AddComponentNodeButton>

      <div className={styles.targetList_body}>
        {list?.map?.((item) => {
          const isSelected = item?.value === props?.value;
          return (
            <div
              key={item?.value}
              className={classNames(
                styles.targetList_item,
                isSelected && styles.targetList_item_selected,
              )}
              onClick={() => props?.onChange?.(item?.value)}
            >
              {item?.label}
              <DeleteOutlined
                className={styles.targetList_item_clickable}
                onClick={(e) => {
                  handleDelete(item?.value);
                  e.stopPropagation();
                }}
              />
            </div>
          );
        })}
      </div>

      {!list?.length && <IEmpty />}
    </div>
  );
}
