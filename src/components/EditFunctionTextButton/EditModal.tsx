import { BindModalProps } from "@/hooks";
import { Button, Modal, Space } from "antd";
import CodeEditor from "@/components/CodeEditor";
import { TRANSFORM_PLACEHOLDER } from "@/engine";
import React, { useEffect } from "react";

export interface EditorModalParams {
  text?: string;
}

export default function EditModal(props: BindModalProps<EditorModalParams>) {
  const [text, setText] = React.useState<string>();

  useEffect(() => {
    if (props?.visible) {
      setText(props?.params?.text);
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      width={650}
      title={false}
      open={props?.visible}
      closable={false}
      bodyStyle={{ padding: "12px 20px" }}
      onCancel={props?.onCancel}
      afterClose={props?.afterClose}
      footer={
        <Space>
          <Button
            onClick={() => {
              props?.onOk?.(undefined);
            }}
          >
            重置
          </Button>
          <Button
            type={"primary"}
            onClick={() => {
              props?.onOk?.(text);
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
  );
}
