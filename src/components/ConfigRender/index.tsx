/**
 * ConfigRender
 *
 * @author tangjiahui
 * @date 2025/3/31
 * @description 渲染配置项。
 */
import React, {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { DEFAULT_REGISTER_KEY } from "./registerDefault";
import { Form, Tooltip } from "antd";
import styles from "./index.module.less";
import classNames from "classnames";

const ExtraContext = createContext<any>(undefined);
export function useConfigExtra<T = any>(): T {
  return useContext(ExtraContext);
}

// 注册默认模板组件
import("./registerDefault").then((module) => {
  module.default?.();
});

// 默认已注册的模板key
export type ConfigRenderRegisterKey = DEFAULT_REGISTER_KEY | (string & {});

// 模板组件props
interface ConfigRenderRegisterComponentProps<Extra = any> {
  value: any;
  onChange: (value: any) => void;
  useExtra: () => Extra;
  options?: Record<string, any>; // 组件额外配置项
}

// 配置项模板组件类型
type ConfigRenderRegisterComponent<Extra = any> = React.FC<
  ConfigRenderRegisterComponentProps<Extra>
>;

// 配置项类型
export type ConfigRenderItem<ConfigKey extends any = string, Extra = any> =
  | OR<
      {
        key: ConfigKey | (string & {}); // 唯一key
        label: React.ReactNode; // 标签
        labelTip?: React.ReactNode; // 标签提示语
        component: ConfigRenderRegisterKey | ConfigRenderRegisterComponent<Extra>; // 支持({value, onChange, options})的组件, 或预定义枚举。（传入string表示注册的组件，传入ReactElement则显示该组件）
        options?: Record<string, any>; // 传给 component 的属性配置
      },
      React.ReactElement
    >
  | React.FC<Pick<ConfigRenderRegisterComponentProps<Extra>, "useExtra">>;

interface ConfigListProps<ConfigKey extends any = string, Extra = any> {
  /** 配置项列表 */
  items?: ConfigRenderItem<ConfigKey, Extra>[];
  /** 选中值 */
  value?: Record<string, any>;
  /** 值变更回调 */
  onChange?: (value: Record<string, any>) => void;
  /** label 样式 */
  labelStyle?: React.CSSProperties;
  /** 额外属性配置（方便form.Item内的组件穿透获取最新属性） */
  extra?: Extra;
}

// 已注册组件模板映射
let registered = new Map<string, ConfigRenderRegisterComponent>();
export default function ConfigRender<ConfigKey = string, Extra = any>(
  props: ConfigListProps<ConfigKey>,
) {
  const { items } = props;
  const [form] = Form.useForm();

  // 保存最新的props引用
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

  // 渲染表单
  const renderList = useMemo(() => {
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
          // 如果是一个React元素，则直接显示
          if (isValidElement(item)) {
            return item;
          }
          if (typeof item === "function") {
            const Component: any = item;
            return <Component key={item} useExtra={useConfigExtra} />;
          }
          // 渲染 自定义组件模板 / 预定义的组件模板
          const Component: ConfigRenderRegisterComponent<Extra> | undefined =
            typeof item.component === "string"
              ? (registered.get(item.component) as any)
              : item.component;
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
                {item?.labelTip ? (
                  <Tooltip title={item.labelTip}>{item.label}</Tooltip>
                ) : (
                  item.label
                )}
                <span>:</span>
              </div>
              {/* 渲染表单组件 */}
              <div className={styles.configRender_item_value}>
                {Component ? (
                  <Form.Item key={item?.key as string} noStyle name={item.key as string}>
                    {/* @ts-ignore */}
                    <Component options={item?.options} useExtra={useConfigExtra} />
                  </Form.Item>
                ) : undefined}
              </div>
            </div>
          );
        })}
      </Form>
    );
  }, [items]);

  useEffect(() => {
    // value变更设置时，改变表单内容
    form.setFieldsValue({
      ...getInitial(),
      ...props?.value,
    });
  }, [props?.value]);

  return <ExtraContext.Provider value={props?.extra}>{renderList}</ExtraContext.Provider>;
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
