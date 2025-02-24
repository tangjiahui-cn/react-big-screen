/**
 * useComponentNode
 *
 * @author tangjiahui
 * @date 2025/2/22
 * @description 获取指定id的componentNode（监听变化）。
 */
import engine, { ComponentNodeType } from "..";
import { useEffect, useState } from "react";

export function useComponentNode(id: string): ComponentNodeType | undefined {
  const [componentNode, setComponentNode] = useState<ComponentNodeType>();

  useEffect(() => {
    // 设置componentNode
    setComponentNode(engine.componentNode.get(id));
    // 监听数据节点变化
    return engine.componentNode.onChange(id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, [id]);

  return componentNode;
}
