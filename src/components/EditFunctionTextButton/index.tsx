/**
 * EditFunctionTextButton
 *
 * @author tangjiahui
 * @date 2025/2/12
 * @description 编辑函数字符串的按钮。
 */
import { Button, Modal, Space, Tooltip } from "antd";
import CodeEditor from "@/components/CodeEditor";
import React, { useMemo, useState } from "react";
import { TRANSFORM_PLACEHOLDER } from "@/engine";
import classNames from "classnames";

interface Props {
  tooltip?: React.ReactNode;
  value?: string;
  onChange?: (value?: string) => void;
}

export default function EditFunctionTextButton(props: Props) {
  const { value } = props;
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string>();

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
          setText(value);
          setVisible(true);
        }}
      >
        {children}
      </span>

      <Modal
        centered
        width={650}
        title={false}
        open={visible}
        closable={false}
        bodyStyle={{ padding: "12px 20px" }}
        onCancel={() => setVisible(false)}
        footer={
          <Space>
            <Button
              onClick={() => {
                props?.onChange?.(undefined);
                setVisible(false);
              }}
            >
              重置
            </Button>
            <Button
              type={"primary"}
              onClick={() => {
                props?.onChange?.(text);
                setVisible(false);
              }}
            >
              保存
            </Button>
          </Space>
        }
      >
        <h3>转换函数</h3>
        <CodeEditor
          language={"javascript"}
          style={{ height: 450 }}
          value={text ?? TRANSFORM_PLACEHOLDER}
          onChange={setText}
        />
      </Modal>
    </>
  );
}
