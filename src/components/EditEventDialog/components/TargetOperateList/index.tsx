/**
 * 目标操作列表
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import styles from "./index.module.less";
import React, { useMemo } from "react";
import classNames from "classnames";
import engine, { ComponentNodeEventTargetOpt, INIT_EXPOSE_MAP } from "@/engine";
import IEmpty from "@/components/IEmpty";
import { DeleteOutlined } from "@ant-design/icons";
import AddExposesButton from "@/components/AddExposesButton";
import { createUUID } from "@/engine/utils";

interface Props {
  cId?: string; // 组件id
  value?: string;
  onChange?: (value?: string) => void;
  opts?: ComponentNodeEventTargetOpt[];
  style?: React.CSSProperties;
  className?: string;
  onChangeOpts?: (value: ComponentNodeEventTargetOpt[]) => void;
}

export default function TargetOperateList(props: Props) {
  const exposeNameMap = useMemo(() => {
    return (
      engine.component.get(props?.cId)?.exposes?.reduce?.(
        (dataMap, expose) => {
          dataMap[expose.value] = expose.label;
          return dataMap;
        },
        { ...INIT_EXPOSE_MAP } as Record<string, string>,
      ) || {}
    );
  }, [props?.opts, props?.cId]);

  const list = useMemo(() => {
    return props?.opts?.map?.((opt) => {
      return {
        value: opt.operateId,
        label: exposeNameMap[opt.exposeId] || "-",
      };
    });
  }, [props?.opts, exposeNameMap]);

  function handleAdd(item: { label: string; value: string }) {
    const newOpts: ComponentNodeEventTargetOpt[] = [
      ...(props?.opts || []),
      {
        operateId: createUUID(),
        exposeId: item.value,
        option: {},
      },
    ];
    props?.onChangeOpts?.(newOpts);
    if (newOpts.length === 1) {
      props?.onChange?.(newOpts[0].operateId);
    }
  }

  function handleDelete(operateId: string) {
    const filterOpts = props?.opts?.filter?.((opt) => opt.operateId !== operateId) || [];
    props?.onChangeOpts?.(filterOpts);
    if (operateId === props?.value) {
      props?.onChange?.(filterOpts?.[0]?.operateId);
    }
  }

  return (
    <div className={classNames(styles.targetList, props?.className)} style={props?.style}>
      <AddExposesButton
        style={{ margin: -1 }}
        cId={props?.cId}
        onSelect={(item) => handleAdd(item)}
      >
        新增操作
      </AddExposesButton>

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
