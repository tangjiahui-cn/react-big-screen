/**
 * 语言文件类型（具体含义参考 ./locales/zh.ts）
 */
export interface LocaleType {
  reset: string;
  menu: {
    bar: {
      library: string;
      pages: string;
      componentNodes: string;
      property: string;
      favorites: string;
      history: string;
    };
    library: {
      base: string;
      charts: string;
      layout: string;
      nav: string;
      unknown: string;
    };
  };
  head: {
    shortCutKeys: {
      title: string;
      all: string;
      invert: string;
      copy: string;
      save: string;
      multiple: string;
      multipleExt: {
        ext1: string;
        ext2: string;
      };
      delete: string;
      deleteExt: {
        ext1: string;
      };
      move: string;
      force: string;
      forceExt: {
        ext1: string;
        ext2: string;
      };
      undo: string;
      cancelUndo: string;
      zoom: string;
      zoomExt: {
        ext1: string;
      };
      zoomReset: string;
      zoomResetExt: {
        ext1: string;
      };
    };
    undo: string;
    cancelUndo: string;
    export: string;
    import: string;
    save: string;
    clear: string;
    language: string;
    settings: string;
    preview: string;
  };
  attributes: {
    empty: string;
    attr: {
      title: string;
    };
    dataSource: {
      title: string;
    };
    interactive: {
      title: string;
    };
  };
}
