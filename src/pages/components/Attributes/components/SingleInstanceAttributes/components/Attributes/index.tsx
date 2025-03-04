/**
 * Attributes
 *
 * @authorn tangjiahui
 * @date 2025/1/14
 */
import { useEffect, useMemo } from "react";
import { Checkbox, Col, Form, InputNumber, Row } from "antd";
import { useSingleSelectedInstance } from "../..";
import engine, { ComponentNodeType } from "@/engine";
import styles from "./index.module.less";
import { Line, LineConfigProvider } from "@/components/Attributes";
import EditText from "@/components/EditText";
import { addHistory } from "@/packages/shortCutKeys";

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const [form] = Form.useForm<Partial<ComponentNodeType>>();
  const component = useMemo(() => {
    return engine.component.get(componentNode?.cId);
  }, [componentNode?.cId]);
  const AttributesComponent = component?.attributesComponent;

  // 切换全页面
  function handleChangeIsAllPage(isAllPage: boolean) {
    // 只有关闭全页面时才需要手动删除全局global
    // 开启全页面不需要 (因为切换页面时会保存当前页所有数据，自动更新 global、componentNodes)
    // 【tips：每次切换页面时，才会真正区分全页面组件】
    if (!isAllPage) {
      engine.page.removeGlobalComponentNode(componentNode?.id);
    }
  }

  useEffect(() => {
    if (componentNode) {
      form.setFieldsValue({
        ...componentNode,
        isAllPage: !!componentNode?.isAllPage,
      });
    }
  }, [componentNode]);

  return (
    <Form
      form={form}
      className={styles.singleInstanceAttributesBase}
      onValuesChange={(changedValues) => {
        let historyDescription = "修改组件";
        // 修改"全页面"属性时
        if (changedValues.hasOwnProperty("isAllPage")) {
          handleChangeIsAllPage(changedValues.isAllPage);
          historyDescription = changedValues.isAllPage ? "设置组件全页面" : "取消组件全页面";
        }
        // 其他属性更新
        engine.componentNode.update(componentNode?.id, changedValues);
        addHistory(historyDescription);
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

      <div className={styles.singleInstanceAttributesBase_body}>
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
          <LineConfigProvider labelSpan={4}>
            <Line label={"层级"} style={{ marginTop: 8 }} labelSpan={3}>
              <Form.Item name={"level"} noStyle>
                <InputNumber size={"small"} style={{ width: "100%" }} />
              </Form.Item>
            </Line>
            <Line label={"全页面"} style={{ marginTop: 8 }} labelTip={"每个页面都会显示"}>
              <Form.Item noStyle name={"isAllPage"} valuePropName={"checked"}>
                <Checkbox />
              </Form.Item>
            </Line>
          </LineConfigProvider>
        </div>

        {/* 组件Attributes配置项 */}
        {componentNode && AttributesComponent && (
          <div style={{ paddingTop: 8 }}>
            <AttributesComponent
              componentNode={componentNode}
              onChangeComponentNode={(target) => {
                engine.componentNode.update(componentNode?.id, target);
                addHistory("修改组件属性");
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
                addHistory("修改组件属性");
              }}
            />
          </div>
        )}
      </div>
    </Form>
  );
}
