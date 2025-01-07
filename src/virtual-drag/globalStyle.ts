/**
 * GlobalStyle
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description make the style-tag mount under document head tag unique.
 */
class GlobalStyle {
  // style tag.
  style: HTMLStyleElement | undefined;
  // count usage times.
  count: number = 0;

  mount() {
    this.count++;
    if (this.style) {
      return;
    }
    const el = document.createElement("style");
    el.setAttribute("id", "virtual-drag");
    el.innerHTML = "html.is-dragging * {cursor: copy;};";
    document.head.appendChild((this.style = el));
  }

  unmount() {
    if (!this.style || --this.count > 0) {
      return;
    }
    this.count = 0;
    this.style.remove();
    this.style = undefined;
  }
}

export const globalStyle = new GlobalStyle();
