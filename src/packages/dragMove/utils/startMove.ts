/**
 * 立刻监听全局鼠标移动偏移量
 *
 * @author tangjiahui
 * @date 2025/3/8
 */

type MoveHookType = (deltaX: number, deltaY: number, e: MouseEvent) => boolean | void;
type MovePartialHookType = (deltaX: number, deltaY: number, e?: MouseEvent) => boolean | void;

export type MoveHookQueueType = {
  onStart?: MovePartialHookType;
  onMove?: MoveHookType;
  onEnd?: MoveHookType;
};

interface moveableDomOptions {
  startX: number; // 初始鼠标x坐标
  startY: number; // 初始鼠标y坐标
  startEvent?: MouseEvent; // 初始事件
  onStart?: MovePartialHookType; // 开始移动
  onMove?: MoveHookType; // 移动中
  onEnd?: MoveHookType; // 移动结束
  // 执行队列 （先于 options?.onXXX 事件执行）
  hookQueue?: (MoveHookQueueType | void)[]; // 每个hookQueueData返回false，则不执行之后的所有hookQueueData
}

type UnmountMoveableDom = () => void;

export function startMove(options: moveableDomOptions): UnmountMoveableDom {
  let moveInfo = {
    startX: options?.startX ?? 0,
    startY: options?.startY ?? 0,
  };

  const {
    startHooks = [],
    moveHooks = [],
    endHooks = [],
  } = options?.hookQueue?.reduce(
    (result, current) => {
      if (current?.onStart) result.startHooks.push(current.onStart);
      if (current?.onMove) result.moveHooks.push(current.onMove);
      if (current?.onEnd) result.endHooks.push(current.onEnd);
      return result;
    },
    {
      startHooks: [],
      moveHooks: [],
      endHooks: [],
    } as {
      startHooks: MovePartialHookType[];
      moveHooks: MoveHookType[];
      endHooks: MoveHookType[];
    },
  ) || {};

  if (options?.onStart) startHooks.push(options.onStart);
  if (options?.onMove) moveHooks.push(options.onMove);
  if (options?.onEnd) endHooks.push(options.onEnd);

  function handleStart(deltaX: number = 0, deltaY: number = 0, e?: MouseEvent) {
    let i = 0;
    while (startHooks[i] && startHooks[i](deltaX, deltaY, e) !== false) {
      i++;
    }
  }

  function handleMove(deltaX: number, deltaY: number, e: MouseEvent) {
    let i = 0;
    while (moveHooks[i] && moveHooks[i](deltaX, deltaY, e) !== false) {
      i++;
    }
  }

  function handleEnd(deltaX: number, deltaY: number, e: MouseEvent) {
    let i = 0;
    while (endHooks[i] && endHooks[i](deltaX, deltaY, e) !== false) {
      i++;
    }
  }

  function mousemove(e: MouseEvent) {
    const deltaX = Math.round(e.x - moveInfo.startX);
    const deltaY = Math.round(e.y - moveInfo.startY);
    handleMove(deltaX, deltaY, e);
  }

  function mouseup(e: MouseEvent) {
    const deltaX = Math.round(e.x - moveInfo.startX);
    const deltaY = Math.round(e.y - moveInfo.startY);
    handleEnd(deltaX, deltaY, e);
    clear();
  }

  function clear() {
    window.removeEventListener("mouseup", mouseup);
    window.removeEventListener("mousemove", mousemove);
  }

  // 只能点击鼠标左键开始移动
  window.addEventListener("mouseup", mouseup);
  window.addEventListener("mousemove", mousemove);
  handleStart(0, 0, options?.startEvent);

  // 卸载
  return () => clear();
}
