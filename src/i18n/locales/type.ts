export interface Locale {
  menu: {
    bar: {
      library: string;
      pages: string;
      componentNodes: string;
      property: string;
      favorites: string;
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
