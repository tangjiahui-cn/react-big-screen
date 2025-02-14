/**
 * EditFunctionTextButton
 *
 * @author tangjiahui
 * @date 2025/2/12
 * @description 编辑函数字符串的按钮。
 */
import { Tooltip } from "antd";
import React, { useMemo } from "react";
import classNames from "classnames";
import EditModal, { EditorModalParams } from "./EditModal";
import { useBindModal } from "@/hooks";

interface Props {
  tooltip?: React.ReactNode;
  value?: string;
  onChange?: (value?: string) => void;
}

export default function EditFunctionTextButton(props: Props) {
  const editModal = useBindModal<EditorModalParams>(EditModal, {
    onOk(text?: string) {
      props?.onChange?.(text);
    },
  });

  const children = useMemo(() => {
    if (!props?.tooltip) return <span>{"{}"}</span>;
    return (
      <Tooltip title={props?.tooltip}>
        <span>{"{}"}</span>
      </Tooltip>
    );
  }, [props?.tooltip]);

  return (
    <>
      <span
        className={classNames("icon_clickable", props?.value && "icon_selected")}
        style={{ fontSize: 14 }}
        onClick={() => {
          editModal.open({
            text: props?.value,
          });
        }}
      >
        {children}
      </span>
      {editModal.children}
    </>
  );
}
