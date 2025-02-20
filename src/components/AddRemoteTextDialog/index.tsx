/**
 * 获取远程url文本内容对话框
 *
 * @author tangjiahui
 * @date 2025/2/19
 */
import { createBindModalHook } from "@/hooks";
import { Button, Form, message, Modal } from "antd";
import { IInput } from "@/components/Attributes/base/IInput";
import CodeEditor from "@/components/CodeEditor";
import { getUrlText } from "@/utils";
import { useRef, useState } from "react";

interface Params {
  beforeOk?: (content: string) => boolean | Promise<boolean>; // 在确定之前判断（返回true可以保存，false则不能保存 ）
}

const useAddRemoteTextDialog = createBindModalHook<Params>((props) => {
  const { params } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const queryUrlRef = useRef<string>(""); // 保存查询到结果的url地址

  function handleRead() {
    form.validateFields(["url"]).then((values) => {
      if (!["http", "https"].find((prefix) => values?.url?.startsWith?.(prefix))) {
        message.error("地址格式不正确");
        return;
      }
      setLoading(true);
      getUrlText(values?.url)?.then((content) => {
        setLoading(false);
        queryUrlRef.current = values?.url;
        form.setFieldsValue({
          content,
        });
      });
    });
  }

  async function handleSave() {
    const content = form.getFieldValue("content");
    if (!content) {
      message.warn("文本内容不能为空");
    }
    if (params?.beforeOk && !(await Promise.resolve(params?.beforeOk?.(content)))) {
      return;
    }
    props?.onOk?.({
      url: queryUrlRef.current!,
      content,
    });
  }

  return (
    <Modal
      width={800}
      okText={"确定"}
      cancelText={"取消"}
      title={"远程读取"}
      open={props?.visible}
      afterClose={props?.afterClose}
      onCancel={props?.onCancel}
      bodyStyle={{ paddingBottom: 0 }}
      onOk={handleSave}
    >
      <Form form={form} labelCol={{ span: 2 }}>
        <Form.Item label={"地址"} name='url' rules={[{ required: true, message: "请输入地址" }]}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Form.Item noStyle name={"url"} style={{ flex: 1 }}>
              <IInput size={"middle"} />
            </Form.Item>
            <Button type={"primary"} onClick={handleRead} loading={loading}>
              读取
            </Button>
          </div>
        </Form.Item>
        <Form.Item label={"文本"} name={"content"}>
          <CodeEditor language={"javascript"} style={{ height: 400 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default useAddRemoteTextDialog;
