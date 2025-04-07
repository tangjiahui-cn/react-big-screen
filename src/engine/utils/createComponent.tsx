/**
 * 创建一个自定义组件
 *
 * @author tangjiahui
 * @date 2025/2/27
 */
import React from "react";
import { AttributesComponentProps, ComponentProps } from "@/engine";
import ConfigRender, { ConfigRenderItem } from "@/components/ConfigRender";

/**
 * 创建 Component
 * @param Component 组件模板
 * @param defaultOptions 默认options
 */
export function createComponent<
  Options extends Record<string, any> = Record<string, any>,
  TriggerKeys extends string = string,
  ExposeKeys extends string = string,
>(
  Component: React.FC<ComponentProps<Options, TriggerKeys, ExposeKeys>>,
  defaultOptions?: Partial<Options>,
) {
  return function (props: ComponentProps<Options, TriggerKeys, ExposeKeys>) {
    const targetProps = defaultOptions
      ? {
          ...props,
          options: Object.assign({}, defaultOptions, props?.options),
        }
      : props;
    return Component(targetProps);
  };
}

/**
 * 创建 Attributes
 * @param Component 组件模板
 * @param defaultOptions 默认options
 */
export function createAttributes<Options extends Record<string, any> = Record<string, any>>(
  Component: React.FC<AttributesComponentProps<Options>>,
  defaultOptions?: Partial<Options>,
) {
  return function (props: AttributesComponentProps<Options>) {
    const targetProps = defaultOptions
      ? {
          ...props,
          options: Object.assign({}, defaultOptions, props?.options),
        }
      : props;
    return Component(targetProps);
  };
}

/**
 * 创建 Attributes (表单配置式)
 * @param items 配置列表
 * @param defaultOptions 默认options
 */
export function createAttributesByConfig<
  Options extends Record<string, any> = Record<string, any>,
  Extra extends any = AttributesComponentProps<Options>,
>(items?: ConfigRenderItem<keyof Options, Extra>[], defaultOptions?: Partial<Options>) {
  return function (props: AttributesComponentProps<Options>) {
    // 合并options
    const options = defaultOptions
      ? Object.assign({}, defaultOptions, props.options)
      : props.options;

    // 设置了defaultOptions，则合并options
    const extra = defaultOptions
      ? {
          ...props,
          options: {
            ...props.options,
            ...options,
          },
        }
      : props;

    // 表单渲染器
    return (
      <ConfigRender<keyof Options, Extra>
        items={items}
        value={options}
        extra={extra}
        onChange={(value) => {
          props.onChange(value as any);
        }}
      />
    );
  };
}
