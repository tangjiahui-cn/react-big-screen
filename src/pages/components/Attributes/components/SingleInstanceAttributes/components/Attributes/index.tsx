/**
 * Attributes
 *
 * @authorn tangjiahui
 * @date 2025/1/14
 */
import { useEffect, useMemo } from "react";
import { Col, Form, InputNumber, Row } from "antd";
import { useSingleSelectedInstance } from "../..";
import engine, { ComponentNodeType } from "@/engine";
import styles from "./index.module.less";
import { Line } from "@/components/Attributes";
import EditText from "@/components/EditText";

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const [form] = Form.useForm<Partial<ComponentNodeType>>();
  const component = useMemo(() => {
    return engine.component.get(componentNode?.cId);
  }, [componentNode?.cId]);
  const AttributesComponent = component?.attributesComponent;

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
      {/* 选中组件信息 */}
      <div className={styles.singleInstanceAttributesBase_description}>
        <Row>
          <Col span={24} style={{ marginBottom: 6 }}>
            <EditText
              emptyMessage={"请填写名称"}
              value={componentNode?.name}
              onChange={(name) => {
                engine.componentNode.update(componentNode?.id, {
                  name,
                });
              }}
            />
          </Col>
          <Col span={24}>id：{componentNode?.id || "-"}</Col>
          <Col span={24}>cId：{componentNode?.cId || "-"}</Col>
          <Col span={24}>cName：{componentNode?.cName || "-"}</Col>
        </Row>
      </div>

      {/* 公共Attributes配置项 */}
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
        </Row>
        <Line label={"层级"} style={{ marginTop: 8 }} labelSpan={3}>
          <Form.Item name={"level"} noStyle>
            <InputNumber size={"small"} style={{ width: "100%" }} />
          </Form.Item>
        </Line>
      </div>

      {/* 组件Attributes配置项 */}
      {componentNode && AttributesComponent && (
        <div style={{ paddingTop: 8 }}>
          <AttributesComponent
            componentNode={componentNode}
            onChangeComponentNode={(target) => {
              engine.componentNode.update(componentNode?.id, target);
            }}
            options={componentNode?.options}
            onChange={(options, cover) => {
              engine.componentNode.update(componentNode?.id, {
                options: cover
                  ? options
                  : {
                      ...componentNode?.options,
                      ...options,
                    },
              });
            }}
          />
        </div>
      )}
    </Form>
  );
}
