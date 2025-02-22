/**
 * 编辑favorite弹窗
 *
 * @author tangjiahui
 * @date 2025/2/22
 */
import { createBindModalHook } from "@/hooks";
import { Form, Modal } from "antd";
import { FavoritesComponentType } from "@/engine";
import { IInput } from "@/components/Attributes/base/IInput";
import { useEffect } from "react";

interface Params {
  favorite: FavoritesComponentType;
}

const useEditFavoriteDialog = createBindModalHook<Params>((props) => {
  const [form] = Form.useForm();
  const favorite = props?.params?.favorite;

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.({
        ...favorite,
        name: values?.name,
      });
    });
  }

  useEffect(() => {
    if (props?.visible) {
      form.setFieldsValue({
        name: favorite?.name,
      });
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      closable={false}
      open={props?.visible}
      onCancel={props?.onCancel}
      afterClose={props?.afterClose}
      onOk={handleOk}
      okText={"保存"}
      cancelText={"取消"}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form form={form}>
        <Form.Item label='名称' name='name' rules={[{ required: true, message: "请填写名称" }]}>
          <IInput size={"middle"} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default useEditFavoriteDialog;
