/**
 * 立刻监听全局鼠标移动虚拟偏移量
 *
 * @author tangjiahui
 * @date 2025/3/8
 * @description 支持虚拟偏移量功能，用于操作区域放大或者缩小时，能准确获得操作区域的虚拟偏移量。
 * （真实像素偏移量：屏幕像素位移偏移量）
 * （虚拟偏移量：屏幕像素偏移量 映射到 操作区域的偏移距离）
 */

type MoveHookType = (
  deltaX: number, // x轴虚拟偏移量（如果scale是1，则该值为真实像素。scale越大，编辑器区域越大，则真实屏幕像素不变的情况下，对应虚拟像素越小）
  deltaY: number, // y轴虚拟偏移量（如果scale是1，则该值为真实像素）
  e: MouseEvent, // 触发事件
) => boolean | void;
type MovePartialHookType = (deltaX: number, deltaY: number, e?: MouseEvent) => boolean | void;

export type MoveHookQueueType = {
  onStart?: MovePartialHookType;
  onMove?: MoveHookType;
  onEnd?: MoveHookType;
};

interface moveableDomOptions {
  scale?: number; // 缩放比率（默认1。缩放倍率越大，虚拟偏移量deltaX、deltaY则越小。因为绘制区域变大，真实移动像素不变，绘制区域上的虚拟偏移量则变小）
  startX: number; // 初始鼠标x坐标
  startY: number; // 初始鼠标y坐标
  startEvent?: MouseEvent; // 初始事件
  onStart?: MovePartialHookType; // 开始移动
  onMove?: MoveHookType; // 移动中
  onEnd?: MoveHookType; // 移动结束
  // 执行队列 （先于 options?.onXXX 事件执行）
  hookQueue?: (MoveHookQueueType | void | false | undefined | null)[]; // 每个hookQueueData返回false，则不执行之后的所有hookQueueData
}

type UnmountMoveableDom = () => void;

export function startMove(options: moveableDomOptions): UnmountMoveableDom {
  const scale = options?.scale || 1;
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
      if (current) {
        if (current?.onStart) result.startHooks.push(current.onStart);
        if (current?.onMove) result.moveHooks.push(current.onMove);
        if (current?.onEnd) result.endHooks.push(current.onEnd);
      }
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

  const isHasListener = startHooks.length || moveHooks.length || endHooks.length;

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
    const deltaX = e.x - moveInfo.startX;
    const deltaY = e.y - moveInfo.startY;
    handleMove(deltaX / scale, deltaY / scale, e);
  }

  function mouseup(e: MouseEvent) {
    const deltaX = Math.round((e.x - moveInfo.startX) / scale);
    const deltaY = Math.round((e.y - moveInfo.startY) / scale);
    handleEnd(deltaX, deltaY, e);
    clear();
  }

  function clear() {
    if (!isHasListener) return;
    window.removeEventListener("mouseup", mouseup);
    window.removeEventListener("mousemove", mousemove);
  }

  // 如果有事件监听器，才会触发拖拽
  if (isHasListener) {
    // 只能点击鼠标左键开始移动
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
    handleStart(0, 0, options?.startEvent);
  }

  // 卸载
  return () => clear();
}
