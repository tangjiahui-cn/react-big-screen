/**
 * Interactive
 *
 * @author tangjiahui
 * @date 2025/2/10
 * @description 组件间交互
 */
import { useSingleSelectedInstance } from "../..";
import CodeEditor from "@/components/CodeEditor";
import { useEffect } from "react";
import styles from "./index.module.less";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, message, Tooltip } from "antd";
import engine from "@/engine";
import { isObject } from "@/utils";

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const [form] = Form.useForm();

  function handleReset() {
    form.setFieldsValue({
      code: JSON.stringify(componentNode || {}, null, "\t"),
    });
  }

  function handleSave() {
    const code = form.getFieldValue("code") || "";
    try {
      const overrideComponentNode = JSON.parse(code);
      if (!isObject(overrideComponentNode)) {
        console.error("must be an object.");
        return;
      }
      engine.componentNode.update(componentNode?.id, overrideComponentNode, { cover: true });
      message.success("修改成功");
    } catch (e) {
      console.error(e);
      message.error("json格式不正确");
    }
  }

  useEffect(() => {
    handleReset();
  }, [componentNode]);

  return (
    <Form className={styles.json} form={form}>
      <div className={styles.json_head}>
        <span>
          <b style={{ marginRight: 8 }}>ComponentNode数据</b>
          <Tooltip title={"重置"}>
            <ReloadOutlined className={"icon_clickable"} onClick={handleReset} />
          </Tooltip>
        </span>
        <Tooltip title={"保存"} placement={"top"}>
          <SaveOutlined className={"icon_clickable"} onClick={handleSave} />
        </Tooltip>
      </div>
      <div className={styles.json_body}>
        <Form.Item noStyle name={"code"}>
          <CodeEditor
            language={"json"}
            minimap={false}
            style={{
              height: "100%",
              width: "100%",
            }}
            options={{
              fontSize: 11,
              tabSize: 3,
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
}
