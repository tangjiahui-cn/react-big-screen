/**
 * 范围框选实例
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RangeInfo, useRangeBox } from "@/packages/rangeBox";
import { isIntersect } from "@/utils";
import { RefObject, useMemo } from "react";
import { throttle } from "lodash-es";
import engine from "..";
import { isKeyPressed } from "@/packages/shortCutKeys";

export function useRangeSelect(domRef: RefObject<HTMLDivElement | null>) {
  // 范围框选
  const handleSelectRangeInfo: (rangeInfo: RangeInfo) => void = useMemo(() => {
    return throttle((rangeInfo: RangeInfo) => {
      // 过滤框选实例
      const selectedIds = engine.componentNode.getAll().reduce((result, componentNode) => {
        const p1 = {
          x1: componentNode.x,
          y1: componentNode.y,
          x2: componentNode.x + componentNode.width,
          y2: componentNode.y + componentNode.height,
        };
        const p2 = {
          x1: rangeInfo.x,
          y1: rangeInfo.y,
          x2: rangeInfo.x + rangeInfo.width,
          y2: rangeInfo.y + rangeInfo.height,
        };
        // 两个矩形是否相交
        if (isIntersect(p1, p2)) {
          if (!componentNode.lock || (componentNode.lock && isKeyPressed("shift"))) {
            result.push(componentNode.id);
          }
        }
        return result;
      }, [] as string[]);
      // 选中框选的实例
      engine.instance.select(selectedIds, true);
    }, 100);
  }, []);

  useRangeBox(domRef, {
    onMove(rangeInfo) {
      handleSelectRangeInfo(rangeInfo);
    },
    onEnd(rangeInfo) {
      handleSelectRangeInfo(rangeInfo);
    },
  });
}
