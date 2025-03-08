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
      clear();

      // 组件实例id
      const id = (e.target as any)?.dataset?.id;

      // 点击组件
      if (id) {
        const instance = engine.instance.get(id);
        if (!instance) return;
        // 处理组件选中
        handleClickComponentNode(instance, e);
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
            // 监听创建范围多选框
            listenRangeBox(dom),
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
