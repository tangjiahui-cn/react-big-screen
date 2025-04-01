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
export function createAttributesByConfig<Options extends Record<string, any> = Record<string, any>>(
  items?: ConfigRenderItem<keyof Options>[],
  defaultOptions?: Partial<Options>,
) {
  return function (props: AttributesComponentProps<Options>) {
    // 合并options
    const options = defaultOptions
      ? Object.assign({}, defaultOptions, props.options)
      : props.options;

    // 表单渲染器
    return (
      <ConfigRender
        items={items}
        value={options}
        onChange={(value) => {
          props.onChange(value as any);
        }}
      />
    );
  };
}
