/**
 * 用于修改全局cursor
 */
import React from "react";

type Cursor = React.CSSProperties["cursor"];

const id = "global-cursor";
const className = "global-cursor";
class GlobalCursor {
  private style: HTMLStyleElement | null | undefined;
  private isSet: boolean = false;

  // 设置全局cursor
  public set(cursor: Cursor) {
    const el = document.createElement("style");
    el.setAttribute("id", id);
    el.innerHTML = `html.${className} * {cursor:${cursor} !important;}`;
    document.head.appendChild(el);
    document.documentElement.classList.add(className);
    this.isSet = true;
    this.style = el;
  }

  // 卸载全局cursor
  public revoke() {
    if (!this.isSet) {
      return;
    }
    this.isSet = false;
    document.documentElement.classList.remove(className);
    if (this.style) {
      this.style?.remove?.();
      this.style = undefined;
    }
  }
}

const globalCursor = new GlobalCursor();
export default globalCursor;
