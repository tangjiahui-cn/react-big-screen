/**
 * 创建 handleTrigger 函数
 */
import { useMemo } from "react";
import engine, {
  ComponentNodeEventTarget,
  ComponentNodeEventTargetCommonOption,
  ComponentNodeEventTargetCustomOption,
  ComponentNodeEventTargetOpt,
  ComponentNodeEventTargetRequestOption,
  ComponentNodeEventTargetVisibleOption,
  ComponentNodeType,
  GetUpdateTargetComponentNodeFunction,
  INIT_EXPOSES,
  TransformFunction,
  TransformFunctionOptions,
} from "..";
import { ensureObject, getMainFunction } from "@/utils";
import { message } from "antd";

export function getEventId(componentNodeId: string, exposeId: string): string {
  return `${componentNodeId}-${exposeId}`;
}

// 获取解析data
function parserData(
  parserFuncText: string | undefined, // 包含函数字符串
  data: any, //  数据
  options: TransformFunctionOptions, // 配置项
): any {
  if (!parserFuncText) return data;
  // 从文本中获取转换函数
  const parserFunc = getMainFunction<TransformFunction>(parserFuncText);
  if (!parserFunc) return data;
  // 返回处理结果
  return parserFunc(data, options);
}

// 处理显隐 option
function handleVisibleOption(
  opt: ComponentNodeEventTargetOpt, // 配置
  target: ComponentNodeType, // 目标组件
) {
  const option = opt?.option as ComponentNodeEventTargetVisibleOption;
  engine.componentNode.update(target.id, {
    show: !!option?.visible,
  });
}

// 处理请求 option
function handleRequestOption(
  opt: ComponentNodeEventTargetOpt, // 配置
  target: ComponentNodeType, // 目标组件
  origin: ComponentNodeType, // 源组件
  payload?: any, // 参数
) {
  const option = opt?.option as ComponentNodeEventTargetRequestOption;
  let data = option?.type === "json" ? option?.params : payload;
  // 执行转换函数
  data = parserData(option?.parserFunc, data, {
    target,
    origin,
    option,
  });
  // 确保是对象
  data = ensureObject(data);
  engine.instance.get(target?.id)?.request?.(data);
}

// 处理自定义函数 option
function handleCustomOption(
  opt: ComponentNodeEventTargetOpt, // 配置
  target: ComponentNodeType, // 目标组件
  origin: ComponentNodeType, // 源组件
  payload?: any, // 参数
) {
  const option = opt?.option as ComponentNodeEventTargetCustomOption;
  // 执行自定义函数
  if (option?.function) {
    const callback = getMainFunction<GetUpdateTargetComponentNodeFunction>(option?.function);
    const updateComponentNode = callback?.(target, origin, payload);
    engine.componentNode.update(target?.id, updateComponentNode, { cover: true });
  }
}

// 处理默认 option
function handleCommonOption(
  opt: ComponentNodeEventTargetOpt,
  target: ComponentNodeType,
  origin: ComponentNodeType,
  payload?: any,
) {
  const option = opt.option as ComponentNodeEventTargetCommonOption;
  const type = option?.type || "default";
  let data = type === "default" ? payload : option?.value;
  // 执行转换函数
  data = parserData(option?.parserFunc, data, {
    target,
    origin,
    option,
  });
  // 触发目标事件
  engine.events.notify(getEventId(target.id, opt.exposeId), data);
}

// 创建handleTrigger
function createHandleTrigger(componentNodeId: string) {
  return function (triggerId: string, payload: any) {
    const origin = engine.componentNode.get(componentNodeId);
    const targets = origin?.events?.find?.((event) => {
      return event?.triggerId === triggerId;
    })?.targets;

    // 如果没有触发目标则不执行
    if (!targets) return;

    // 触发目标组件的事件
    targets.forEach((optTarget: ComponentNodeEventTarget) => {
      const target: ComponentNodeType | undefined = engine.componentNode.get(optTarget.id);
      if (!target) {
        message.error("[bigScreen]: target componentNode not exist.");
        return;
      }
      optTarget.opts.forEach((opt: ComponentNodeEventTargetOpt) => {
        switch (opt.exposeId) {
          case INIT_EXPOSES.visible:
            handleVisibleOption(opt, target);
            break;
          case INIT_EXPOSES.request:
            handleRequestOption(opt, target, origin, payload);
            break;
          case INIT_EXPOSES.custom:
            handleCustomOption(opt, target, origin, payload);
            break;
          default:
            handleCommonOption(opt, target, origin, payload);
            break;
        }
      });
    });
  };
}

export function useCreateHandleTrigger(componentNodeId: string) {
  return useMemo(() => createHandleTrigger(componentNodeId), []);
}
