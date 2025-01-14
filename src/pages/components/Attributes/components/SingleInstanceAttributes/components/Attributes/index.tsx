/**
 * Attributes
 *
 * @authorn tangjiahui
 * @date 2025/1/14
 */
import { useEffect } from "react";
import { Col, Form, InputNumber, Row } from "antd";
import { useSingleSelectedInstance } from "../..";
import engine, { ComponentNodeType } from "@/engine";
import styles from "./index.module.less";

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const [form] = Form.useForm<Partial<ComponentNodeType>>();

  useEffect(() => {
    if (componentNode) {
      form.setFieldsValue(componentNode);
    }
  }, [componentNode]);

  return (
    <Form
      form={form}
      className={styles.singleInstanceAttributesBase}
      onValuesChange={(changedValues) => {
        engine.componentNode.update(componentNode?.id, changedValues);
      }}
    >
      <div className={styles.singleInstanceAttributesBase_description}>
        <Row>
          <Col span={24} style={{ marginBottom: 6 }}>
            <b>{componentNode?.name}</b>
          </Col>
          <Col span={24}>id：{componentNode?.id || "-"}</Col>
          <Col span={24}>cId：{componentNode?.cId || "-"}</Col>
          <Col span={24}>cName：{componentNode?.cName || "-"}</Col>
        </Row>
      </div>
      <div>
        <Row gutter={[8, 8]} style={{ fontSize: 12 }}>
          <Col span={3} className={styles.singleInstanceAttributesBase_label}>
            X轴
          </Col>
          <Col span={9}>
            <Form.Item name={"x"} noStyle>
              <InputNumber size={"small"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={3} className={styles.singleInstanceAttributesBase_label}>
            Y轴
          </Col>
          <Col span={9}>
            <Form.Item name={"y"} noStyle>
              <InputNumber size={"small"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={3} className={styles.singleInstanceAttributesBase_label}>
            宽度
          </Col>
          <Col span={9}>
            <Form.Item name={"width"} noStyle>
              <InputNumber size={"small"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={3} className={styles.singleInstanceAttributesBase_label}>
            高度
          </Col>
          <Col span={9}>
            <Form.Item name={"height"} noStyle>
              <InputNumber size={"small"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={3} className={styles.singleInstanceAttributesBase_label}>
            层级
          </Col>
          <Col span={21}>
            <Form.Item name={"level"} noStyle>
              <InputNumber size={"small"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
