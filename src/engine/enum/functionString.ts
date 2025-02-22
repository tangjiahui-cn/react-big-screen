// 默认转换函数
import { ComponentNodeEventTargetOption, ComponentNodeType } from "@/engine";

export const TRANSFORM_PLACEHOLDER = `/**
 * 转换request扩展参数函数 (必须包含主函数main)
 *
 * @params {value} 默认携带参数或json对象
 * @params {origin} 源componentNode
 * @params {target} 目标componentNode
 * @params {option} 事件的最小配置 event.target.opt.option
 * @return {value} 返回修改后的额外查询参数
 */
function main(value, {origin, target, option}) {
  return value
}`;

export interface TransformFunctionOptions {
  origin: ComponentNodeType; // 源 componentNode
  target?: ComponentNodeType; // 目标 componentNode
  option: ComponentNodeEventTargetOption; // 当前事件option
}

export type TransformFunction<T = any> = (
  value: T, // 值
  options: TransformFunctionOptions,
) => T; // 返回转换值

// 修改目标componentNode函数
export const CHANGE_TARGET_PLACEHOLDER = `/**
 * 修改目标componentNode (必须包含主函数main)
 *
 * @params {target} 目标componentNode
 * @params {origin} 源componentNode
 * @params {payload} 触发事件源组件发送参数
 * @return {target} 返回修改后的目标componentNode
 */
function main(target, origin, payload) {
  return target
}`;

export type GetUpdateTargetComponentNodeFunction = (
  target?: ComponentNodeType, // 目标 componentNode
  origin?: ComponentNodeType, // 目标 componentNode
  payload?: any, // 携带参数
) => ComponentNodeType;
