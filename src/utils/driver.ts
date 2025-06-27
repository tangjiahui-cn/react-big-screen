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
        element: "#rbs-sizebar",
        popover: {
          title: "尺寸工具栏",
          description: "调整大屏页面的大小、缩放比例。",
        },
      },
      {
        element: "#rbs-choose-example-button",
        popover: {
          title: "切换示例",
          description: "选中下拉切换到其他大屏看板示例。",
        },
      },
      {
        element: "#rbs-starter-help",
        popover: {
          title: "新手教程",
          description: "点击以重新开始此引导教程。",
        },
      },
      {
        element: "#rbs-tool-bar",
        popover: {
          title: "工具栏",
          description:
            "查看快捷键帮助、导出/导入json、保存、清空等操作。（鼠标移入看查看功能简介）",
        },
      },
      {
        element: "#rbs-preview",
        popover: {
          title: "开始预览",
          description: "打开新页面预览当前设计大屏。",
        },
      },
      {
        element: "#rbs-menu",
        popover: {
          title: "菜单区域",
          description: "可以选择组件模板、查看页面组件列表和历史记录等。",
        },
      },
      {
        element: "#rbs-library",
        popover: {
          title: "组件库",
          description: "选中模板拖拽到编辑器创建新组件。",
        },
      },
      {
        element: "#rbs-pages",
        popover: {
          title: "页面管理",
          description: "新增、删除大屏页面。",
        },
      },
      {
        element: "#rbs-componentNodes",
        popover: {
          title: "当前页组件",
          description: "查看当前编辑大屏页面所有的组件，并支持修改。",
        },
      },
      {
        element: "#rbs-property",
        popover: {
          title: "个人资产",
          description: "管理个人远程组件包资产，支持在线导入、本地导入组件包、导出组件包。",
        },
      },
      {
        element: "#rbs-favorites",
        popover: {
          title: "收藏夹",
          description: "管理所有收藏的组件组合，拖拽到编辑器中即可进行创建。",
        },
      },
      {
        element: "#rbs-history",
        popover: {
          title: "历史记录",
          description: "存储你的操作历史记录，最多20个存储容量。",
        },
      },
      {
        element: "#rbs-editor",
        popover: {
          title: "编辑器区域",
          description: "主要拖拽交互区域，通过鼠标拖拽、框选页面组件。",
        },
      },
      {
        element: "#rbs-attributes",
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
