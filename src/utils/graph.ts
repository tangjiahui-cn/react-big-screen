/**
 * 图形方法
 *
 * @author tangjiahui
 * @date 2025/1/20
 */

interface Point {
  x: number;
  y: number;
}

export interface RectCoordinate {
  x1: number; // 左上角x
  y1: number; // 左上角y
  x2: number; // 右下角x
  y2: number; // 右下角y
}

/**
 * 两个矩形是否相交
 * @param rect1 矩形1
 * @param rect2 矩形2
 */
export function isIntersect(rect1: RectCoordinate, rect2: RectCoordinate) {
  return !(
    // 左侧
    (
      rect1.x2 < rect2.x1 ||
      // 右侧
      rect1.x1 > rect2.x2 ||
      // 上方
      rect1.y2 < rect2.y1 ||
      // 下方
      rect1.y1 > rect2.y2
    )
  );
}

/**
 * 判断点是否在矩形内部
 */
export function isInRect(point: Point, rect: RectCoordinate) {
  return point.x >= rect.x1 && point.x <= rect.x2 && point.y >= rect.y1 && point.y <= rect.y2;
}

/**
 * 判断一个矩形是否完全在另一个矩形内部
 */
export function isRectInner(rect: RectCoordinate, targetRect: RectCoordinate) {
  return (
    rect.x1 >= targetRect.x1 &&
    rect.y1 >= targetRect.y1 &&
    rect.x2 <= targetRect.x2 &&
    rect.y2 <= targetRect.y2
  );
}

/**
 * 计算一组坐标的左上角
 */
export function getLeftTopCoordinate(
  coordinates: Array<{
    x: number;
    y: number;
  }>,
) {
  if (!coordinates.length) {
    return;
  }

  return coordinates.reduce(
    (result, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        return {
          x: currentValue.x,
          y: currentValue.y,
        };
      }

      result.x = Math.min(result.x, currentValue.x);
      result.y = Math.min(result.y, currentValue.y);

      return result;
    },
    {
      x: 0,
      y: 0,
    },
  );
}
