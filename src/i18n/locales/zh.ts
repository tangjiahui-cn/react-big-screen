import { LocaleType } from "..";
export default {
  reset: "重置",
  menu: {
    bar: {
      library: "组件库",
      pages: "页面管理",
      componentNodes: "当前页组件",
      property: "个人资产",
      favorites: "收藏夹",
      history: "历史记录",
    },
    library: {
      base: "基础组件",
      charts: "图表组件",
      layout: "布局组件",
      nav: "导航组件",
      unknown: "未分类组件",
    },
  },
  head: {
    shortCutKeys: {
      title: "快捷键",
      all: "全选",
      invert: "反选",
      copy: "复制",
      save: "保存",
      multiple: "多选",
      multipleExt: {
        ext1: "按住",
        ext2: "选中",
      },
      delete: "删除",
      deleteExt: {
        ext1: "或",
      },
      move: "移动",
      force: "强制",
      forceExt: {
        ext1: "按住",
        ext2: "锁定组件",
      },
      undo: "撤销",
      cancelUndo: "取消撤销",
    },
    undo: "撤销",
    cancelUndo: "取消撤销",
    export: "导出",
    import: "导入",
    save: "保存到本地",
    clear: "清空",
    language: "{{text}}",
    settings: "设置",
    preview: "预览",
  },
  attributes: {
    empty: "请选择一个组件",
    attr: {
      title: "属性",
    },
    dataSource: {
      title: "数据",
    },
    interactive: {
      title: "交互",
    },
  },
} as LocaleType;
