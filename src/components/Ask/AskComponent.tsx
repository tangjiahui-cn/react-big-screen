/**
 * 函数式交互对话框（模板）
 *
 * @author tangjiahui
 * @date 2025/2/7
 */
import React, { useState } from "react";
import { Modal, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export interface AskComponentProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: (close: () => void) => void;
  onCancel?: () => void;
}

export default function AskComponent(props: AskComponentProps) {
  const [visible, setVisible] = useState(true);

  // 关闭弹窗
  function handleClose() {
    setVisible(false);
    // 让关闭动画完成后再卸载
    setTimeout(() => {
      props?.onCancel?.();
    }, 300);
  }

  return (
    <Modal
      centered
      open={visible}
      title={
        <Space>
          <QuestionCircleOutlined style={{ color: "#f66e0b" }} />
          {props?.title}
        </Space>
      }
      onCancel={handleClose}
      onOk={() => {
        props?.onOk?.(handleClose);
      }}
      okText={props?.okText}
      cancelText={props?.cancelText}
    >
      {props?.content}
    </Modal>
  );
}
