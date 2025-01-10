/**
 * 鼠标类方法
 *
 * @author tangjiahui
 * @date 2025/1/10
 */

// 点击鼠标左键
export function isClickMouseLeft(e: MouseEvent) {
  return e.button == 0;
}

// 点击鼠标右键
export function isClickMouseRight(e: MouseEvent) {
  return e.button == 2;
}

// 点击鼠标中键
export function isClickMouseMid(e: MouseEvent) {
  return e.button == 1;
}
