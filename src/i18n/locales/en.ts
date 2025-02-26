import { Locale } from ".";

export default {
  menu: {
    bar: {
      library: "library",
      pages: "pages",
      componentNodes: "componentNodes",
      property: "property",
      favorites: "favorites",
    },
    library: {
      base: "base",
      charts: "charts",
      layout: "layout",
      unknown: "unknown",
    },
  },
  head: {
    shortCutKeys: {
      title: "shortcut keys",
      all: "all",
      invert: "invert",
      copy: "copy",
      save: "save",
      multiple: "multiple",
      multipleExt: {
        ext1: "press",
        ext2: "selected",
      },
      delete: "delete",
      deleteExt: {
        ext1: "or",
      },
      move: "move",
      force: "force",
      forceExt: {
        ext1: "press",
        ext2: "lock component",
      },
    },
    undo: "undo",
    cancelUndo: "cancel undo",
    export: "export",
    import: "import",
    save: "save local file",
    clear: "clear",
    language: "{{text}}",
    settings: "settings",
    preview: "preview",
  },
  attributes: {
    empty: "please select a componentNode",
    attr: {
      title: "attributes",
    },
    dataSource: {
      title: "dataSource",
    },
    interactive: {
      title: "interactive",
    },
  },
} as Locale;
