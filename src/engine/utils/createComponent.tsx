/**
 * 创建一个自定义组件
 *
 * @author tangjiahui
 * @date 2025/2/27
 */
import React from "react";
import { AttributesComponentProps, ComponentProps } from "@/engine";

// 创建自定义组件
export function createComponent<
  Option extends any,
  TriggerKeys extends string = string,
  ExposeKeys extends string = string,
>(
  Component: React.FC<ComponentProps<Option, TriggerKeys, ExposeKeys>>, // 组件模板
  defaultOptions?: Partial<Option>, // 默认options
) {
  return function (props: ComponentProps<Option, TriggerKeys, ExposeKeys>) {
    const targetProps = defaultOptions
      ? {
          ...props,
          options: Object.assign({}, defaultOptions, props?.options),
        }
      : props;
    return Component(targetProps);
  };
}

// 创建自定义属性面板
export function createAttributes<Options extends any>(
  Component: React.FC<AttributesComponentProps<Options>>, // 组件模板
  defaultOptions?: Partial<Options>, // 默认options
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
