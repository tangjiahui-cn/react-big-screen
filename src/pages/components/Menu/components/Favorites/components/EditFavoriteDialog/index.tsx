/**
 * 编辑favorite弹窗
 *
 * @author tangjiahui
 * @date 2025/2/22
 */
import { createBindModalHook } from "@/hooks";
import { Button, Form, Modal } from "antd";
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
      bodyStyle={{ paddingBottom: 6 }}
      footer={null}
    >
      <Form form={form}>
        <Form.Item label='名称' name='name' rules={[{ required: true, message: "请填写名称" }]}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Form.Item noStyle name={"name"}>
              <IInput size={"middle"} style={{ flex: 1 }} />
            </Form.Item>
            <Button type={"primary"} onClick={handleOk}>
              保存
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default useEditFavoriteDialog;
