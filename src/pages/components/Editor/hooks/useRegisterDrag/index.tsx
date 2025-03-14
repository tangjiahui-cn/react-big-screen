/**
 * 注册拖拽hook
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { RefObject, useRef } from "react";
import { useDomEvents } from "@/hooks";
import { handleClickEditor } from "./handleClickEditor";
import { handleClickComponentNode } from "./handleClickComponentNode";
import engine from "@/engine";
import { useUnmount } from "ahooks";
import { startMove } from "@/packages/dragMove/utils/startMove";
import { listenDragMove } from "./listenDragMove";
import { listenRangeBox } from "./listenRangeBox";
import { listenDropLayout } from "./listenDropLayout";
import { isClickMouseLeft, isClickMouseRight } from "@/utils";
import { isKeyPressed } from "@/packages/shortCutKeys";

export function useRegisterDrag(domRef: RefObject<HTMLElement>) {
  const unmountsRef = useRef<(Unmount | void)[]>([]);

  // 注册卸载函数
  function addUnmount(cb: Unmount | void) {
    unmountsRef.current.push(cb);
  }

  // 运行卸载函数
  function clear() {
    if (unmountsRef?.current.length) {
      unmountsRef?.current?.map?.((unmount) => {
        unmount?.();
      });
      unmountsRef.current = [];
    }
  }

  useDomEvents(domRef, {
    mousedown(e: MouseEvent) {
      const dom = domRef.current;
      if (!dom) throw new Error("dom must be exist.");

      // 清空所有卸载函数
      clear();

      const isClickLeft = isClickMouseLeft(e);
      const isClickRight = isClickMouseRight(e);
      const isPressedShift = isKeyPressed("shift");

      // 组件实例id
      const id = (e.target as any)?.dataset?.id;
      // 组件对应 instance
      const instance = engine.instance.get(id);
      // 获取组件实例
      const componentNode = instance?.getComponentNode?.();

      // 是否选中实例
      const isSelectedComponentNode = isClickRight
        ? true // 点击右键直接选中
        : componentNode?.lock // 非右键，则只能同时按住shift和点击左键，可以选中
        ? isClickLeft && isPressedShift
        : isClickLeft;

      // 处理组件选中情况
      if (instance && componentNode && isSelectedComponentNode) {
        // 选中组件实例
        handleClickComponentNode(componentNode, e);
        // 只有非锁定且左键按下，才可以移动组件
        if (!componentNode?.lock && isClickLeft) {
          // 监听移动
          addUnmount(
            startMove({
              startX: e.x,
              startY: e.y,
              startEvent: e,
              hookQueue: [
                // 监听移动组件
                listenDragMove(instance),
                // 监听是否放置到 layout 组件
                listenDropLayout(instance, (unmount) => {
                  addUnmount(unmount);
                }),
              ],
            }),
          );
        }
        return;
      }

      // 点击编辑器
      handleClickEditor(e);
      // 监听移动
      addUnmount(
        startMove({
          startX: e.x,
          startY: e.y,
          startEvent: e,
          hookQueue: [
            // 监听创建范围多选框（左键按住范围框选）
            isClickLeft && listenRangeBox(dom),
          ],
        }),
      );
    },
  });

  useUnmount(() => {
    // 销毁运行时（有的拖拽中页面突然切换，内部还未来得及手动销毁，此时通过外部直接中断操作并销毁）
    clear();
  });
}
