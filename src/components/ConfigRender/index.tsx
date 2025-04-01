/**
 * ConfigRender
 *
 * @author tangjiahui
 * @date 2025/3/31
 * @description 渲染配置项。
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import type { DEFAULT_REGISTER_KEY } from "./registerDefault";
import { Form, Tooltip } from "antd";
import styles from "./index.module.less";
import classNames from "classnames";

// 注册默认模板组件
import("./registerDefault").then((module) => {
  module.default?.();
});

// 默认已注册的模板key
export type ConfigRenderRegisterKey = DEFAULT_REGISTER_KEY | (string & {});

// 模板组件props
interface ConfigRenderRegisterComponentProps {
  value?: any;
  options?: Record<string, any>;
  onChange?: (value: any) => void;
}

// 配置项模板组件类型
type ConfigRenderRegisterComponent = React.FC<ConfigRenderRegisterComponentProps>;

// 配置项类型
export interface ConfigRenderItem<ConfigKey extends any = string> {
  key: ConfigKey; // 唯一key
  label: React.ReactNode; // 标签
  labelTip?: React.ReactNode; // 标签提示语
  component: ConfigRenderRegisterKey | ConfigRenderRegisterComponent; // 支持({value, onChange, options})的组件, 或预定义枚举。（传入string表示注册的组件，传入ReactElement则显示该组件）
  options?: Record<string, any>; // 传给 component 的属性配置
}

interface ConfigListProps<ConfigKey extends any = string> {
  /** 配置项列表 */
  items?: ConfigRenderItem<ConfigKey>[];
  /** 选中值 */
  value?: Record<string, any>;
  /** 值变更回调 */
  onChange?: (value: Record<string, any>) => void;
  /** label 样式 */
  labelStyle?: React.CSSProperties;
}

// 已注册组件模板映射
let registered = new Map<string, ConfigRenderRegisterComponent>();
export default function ConfigRender<ConfigKey extends any = string>(
  props: ConfigListProps<ConfigKey>,
) {
  const { items } = props;
  const [form] = Form.useForm();

  const propsRef = useRef<ConfigListProps<ConfigKey>>();
  propsRef.current = props;

  const getInitial = useCallback(() => {
    const initial: Record<string, undefined> = {};
    const formValues = form.getFieldsValue();
    for (const key in formValues) {
      initial[key] = undefined;
    }
    return initial;
  }, []);

  useEffect(() => {
    // value变更设置时，设置form值
    form.setFieldsValue({
      ...getInitial(),
      ...props?.value,
    });
  }, [props?.value]);

  return useMemo(() => {
    return (
      <Form
        form={form}
        className={styles.configRender}
        onValuesChange={(values) => {
          propsRef.current?.onChange?.({
            ...form.getFieldsValue(),
            ...values,
          });
        }}
      >
        {items?.map?.((item) => {
          // 渲染 自定义组件模板 / 预定义的组件模板
          const Component: any =
            typeof item.component === "string" ? registered.get(item.component) : item.component;
          return (
            <div key={item?.key as string} className={styles.configRender_item}>
              {/* 渲染label */}
              <div
                className={classNames(
                  styles.configRender_item_label,
                  item?.labelTip && styles.configRender_item_help,
                )}
                style={props?.labelStyle}
              >
                {item?.labelTip ? <Tooltip title={item.label}>{item.label}</Tooltip> : item.label}
                <span>:</span>
              </div>
              {/* 渲染表单组件 */}
              <div className={styles.configRender_item_value}>
                {Component ? (
                  <Form.Item key={item?.key as string} noStyle name={item.key as string}>
                    <Component options={item?.options} />
                  </Form.Item>
                ) : undefined}
              </div>
            </div>
          );
        })}
      </Form>
    );
  }, [items]);
}

/**
 * 注册模板函数
 * @param componentKey 默认模板key
 * @param component 模板组件
 */
ConfigRender.register = (
  componentKey: ConfigRenderRegisterKey,
  component: ConfigRenderRegisterComponent,
) => {
  registered.set(componentKey, component);
};
