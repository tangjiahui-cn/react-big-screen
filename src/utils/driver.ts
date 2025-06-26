/**
 * 步骤引导
 */
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const key = "__drivered__";

/**
 * 是否已经引导过了
 */
function isHasBeenDriver() {
  return window.localStorage.getItem(key) === "1";
}

/**
 * 设置“已经引导”的状态
 */
function setHasBeenDriver() {
  window.localStorage.setItem(key, "1");
}

/**
 * 开始步骤引导
 *
 * @param force 是否强制开始引导。（默认false，只会引导一次）
 */
export function startDriver(force?: boolean) {
  if (isHasBeenDriver() && !force) {
    return;
  }
  const driverObj = driver({
    showProgress: true,
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "完成",
    steps: [
      {
        element: "#size-bar",
        popover: {
          title: "尺寸工具栏",
          description: "调整大屏页面的大小、缩放比例。",
        },
      },
      {
        element: "#choose-example-button",
        popover: {
          title: "切换示例",
          description: "点击下拉切换到其他预置大屏示例。",
        },
      },
      {
        element: "#starter-help",
        popover: {
          title: "新手教程",
          description: "点击可重新开启此引导教程。",
        },
      },
      {
        element: "#tool-bar",
        popover: {
          title: "工具栏",
          description: "查看快捷键帮助、导出/导入json、保存、清空等操作。",
        },
      },
      {
        element: "#start-preview",
        popover: {
          title: "开始预览",
          description: "打开新页面预览你设计的页面。",
        },
      },
      {
        element: "#screen-menu",
        popover: {
          title: "菜单区域",
          description: "可以选择组件模板、查看页面组件列表和历史记录等。",
        },
      },
      {
        element: "#screen-editor",
        popover: {
          title: "编辑器区域",
          description: "主要拖拽交互区域，通过鼠标拖拽、框选页面组件。",
        },
      },
      {
        element: "#screen-attr",
        popover: {
          title: "属性配置区域",
          description: "查看和配置组件属性，实现想要的效果。",
        },
      },
    ],
    onDestroyed() {
      setHasBeenDriver();
    },
  });

  driverObj.drive();
}
