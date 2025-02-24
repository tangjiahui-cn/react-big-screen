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
  GetUpdateTargetComponentNodeFunction,
  INIT_EXPOSES,
  TransformFunction,
  TransformFunctionOptions,
} from "..";
import { ensureObject, getMainFunction } from "@/utils";
import { message } from "antd";

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

// 创建handleTrigger
function createHandleTrigger(componentNodeId: string) {
  return function (triggerId: string, payload: any) {
    const componentNode = engine.componentNode.get(componentNodeId);
    const targets = componentNode?.events?.find?.((event) => {
      return event?.triggerId === triggerId;
    })?.targets;

    // 如果没有触发目标则不执行
    if (!targets) return;

    // 触发目标组件的事件
    targets.forEach((target: ComponentNodeEventTarget) => {
      const id = target.id;
      const targetComponentNode = engine.componentNode.get(id);
      if (!targetComponentNode) {
        message.error("[bigScreen]: target componentNode not exist.");
        return;
      }
      target.opts.forEach((opt: ComponentNodeEventTargetOpt) => {
        // visible option.
        if (opt.exposeId === INIT_EXPOSES.visible) {
          const option = opt?.option as ComponentNodeEventTargetVisibleOption;
          engine.componentNode.update(id, {
            show: !!option?.visible,
          });
          return;
        }

        // request option.
        if (opt.exposeId === INIT_EXPOSES.request) {
          const option = opt?.option as ComponentNodeEventTargetRequestOption;
          let data = option?.type === "json" ? option?.params : payload;
          // 执行转换函数
          data = parserData(option?.parserFunc, data, {
            origin: componentNode,
            target: targetComponentNode,
            option,
          });
          // 确保是对象
          data = ensureObject(data);
          engine.instance.get(id)?.request?.(data);
          return;
        }

        // custom option.
        if (opt.exposeId === INIT_EXPOSES.custom) {
          const option = opt?.option as ComponentNodeEventTargetCustomOption;
          // 执行自定义函数
          if (option?.function) {
            const customFunction = getMainFunction<GetUpdateTargetComponentNodeFunction>(
              option?.function,
            );
            const updateTargetComponentNode = customFunction?.(
              targetComponentNode,
              componentNode,
              payload,
            );
            // 更新目标组件
            if (updateTargetComponentNode) {
              engine.componentNode.update(id, updateTargetComponentNode);
            }
          }
          return;
        }

        // common option.
        const option = opt.option as ComponentNodeEventTargetCommonOption;
        const type = option?.type || "default";
        // 事件参数值
        let data = type === "default" ? payload : option?.value;
        // 执行转换函数
        data = parserData(option?.parserFunc, data, {
          origin: componentNode,
          target: targetComponentNode,
          option,
        });
        // 触发目标事件
        engine.events.notify(`${targetComponentNode.id}-${opt?.exposeId}`, data);
      });
    });
  };
}

export function useCreateHandleTrigger(componentNodeId: string) {
  return useMemo(() => createHandleTrigger(componentNodeId), []);
}
