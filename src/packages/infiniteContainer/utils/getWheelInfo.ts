/**
 * 获取滚轮信息
 */

interface WheelInfo {
  direction: 1 | -1 | 0; // 1正向 0无 -1负向
  times: number; // 每次变化多少次的比例缩放
}

export function getWheelInfo(e: WheelEvent): WheelInfo {
  let times: WheelInfo["times"] = 1;
  let direction: WheelInfo["direction"] = 0;

  // 兼容 wheelDeltaY
  if ((e as any).wheelDeltaY) {
    const wheelDeltaY = (e as any).wheelDeltaY;
    times = Math.abs(wheelDeltaY) / 120;
    direction = wheelDeltaY > 0 ? 1 : wheelDeltaY < 0 ? -1 : 0;
  } else if ((e as any).deltaY) {
    const deltaY = (e as any).deltaY;
    // 计算方式：times = (deltaY - 4) / 40
    // 以40像素变化为一次缩放变化，使其deltaY的times，和wheelDeltaY的times一致
    times = Math.floor(Math.max(Math.abs(deltaY) - 4, 0) / 40) || 1;
    direction = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;
  }

  return {
    times,
    direction,
  };
}
