/**
 * 新增page对话框
 *
 * @author tangjiahui
 * @date 2025/2/26
 */
import { createBindModalHook } from "@/hooks";
import { Form, Modal } from "antd";
import { IInput } from "@/components/Attributes/base/IInput";
import { createUUID, JsonTypePage } from "@/engine";

interface Params {
  parentId?: string;
  parentName?: string;
}

const useAddPageDialog = createBindModalHook<Params>((props) => {
  const { params } = props;
  const [form] = Form.useForm();

  function createNewPage(name: string): JsonTypePage {
    return {
      name,
      id: createUUID(),
      parentId: params?.parentId,
    };
  }

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.({
        page: createNewPage(values.name),
        parentId: params?.parentId,
      });
    });
  }

  return (
    <Modal
      centered
      open={props?.visible}
      title={"新增页面"}
      afterClose={props?.afterClose}
      onCancel={props?.onCancel}
      onOk={handleOk}
      width={500}
      bodyStyle={{
        padding: "12px 24px 12px 12px",
      }}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        {params?.parentName && <Form.Item label={"父页面"}>{params?.parentName}</Form.Item>}
        <Form.Item label={"名称"} name={"name"} rules={[{ required: true, message: "请输入名称" }]}>
          <IInput />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default useAddPageDialog;
