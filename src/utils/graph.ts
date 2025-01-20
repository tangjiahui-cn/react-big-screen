/**
 * 图形方法
 *
 * @author tangjiahui
 * @date 2025/1/20
 */

interface RectPoint {
  x1: number; // 左上角x
  y1: number; // 左上角y
  x2: number; // 右下角x
  y2: number; // 右下角y
}

export function isIntersect(p1: RectPoint, p2: RectPoint) {
  return !(
    // 左侧
    (
      p1.x2 < p2.x1 ||
      // 右侧
      p1.x1 > p1.x2 ||
      // 上方
      p1.y2 < p2.y1 ||
      // 下方
      p1.y1 > p2.y2
    )
  );
}
