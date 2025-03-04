/**
 * 子页面管理
 *
 * @author tangjiahui
 * @date 2025/2/25
 */
import { ComponentNodeType, JsonTypePage } from "@/engine";
import { cloneDeep } from "lodash-es";

type Listener = (pages: JsonTypePage[]) => void;
type ListenerUnmount = () => void;

export const DEFAULT_PAGE: JsonTypePage = {
  id: "default",
  name: "大屏页面",
  parentId: undefined,
};

export default class Page {
  // pages
  private pages: JsonTypePage[] = []; // 存储pages;
  // page映射componentNodes
  private pageMap: Record<
    string, // pageId
    {
      children: ComponentNodeType[]; // page包含的componentNodes(不包含全局global组件)
    }
  > = {};
  private listeners: Listener[] = [];
  private globalComponentNodes: Record<string, ComponentNodeType> = {}; // 所有全局组件(即全页面展示的组件)

  // 触发pages变更
  private notifyChange() {
    const pages = this.getAll();
    this.listeners.forEach((cb) => {
      cb(pages);
    });
  }

  // 将组件从globalComponents中移除
  public removeGlobalComponentNode(
    componentNodeId?: string | ComponentNodeType | (string | ComponentNodeType)[],
  ) {
    const list = Array.isArray(componentNodeId) ? componentNodeId : [componentNodeId];
    list.forEach((item) => {
      const id = typeof item === "string" ? item : item?.id;
      if (id) {
        delete this.globalComponentNodes[id];
      }
    });
  }

  // 监听pages变更
  public onChange(listener: Listener): ListenerUnmount {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((cb) => {
        return cb !== listener;
      });
    };
  }

  // 初始化pages
  public init(componentNodes: ComponentNodeType[] = [], pages: JsonTypePage[] = []) {
    this.globalComponentNodes = {};
    this.pageMap = { [DEFAULT_PAGE.id]: { children: [] } };
    // 设置空页面
    this.pages = pages?.length ? pages : [cloneDeep(DEFAULT_PAGE)];
    this.pages.forEach((page) => {
      this.pageMap[page.id] ||= { children: [] };
    });
    componentNodes.forEach((componentNode) => {
      const pageId = componentNode?.pageId || DEFAULT_PAGE.id;
      // 添加全页面组件
      if (componentNode?.isAllPage) {
        this.globalComponentNodes[componentNode.id] = componentNode;
        return;
      }
      // 添加非全页面组件
      (this.pageMap[pageId] ||= { children: [] }).children.push(componentNode);
    });
    this.notifyChange();
  }

  // 获取全部全局组件
  public getGlobalComponentNodes(): ComponentNodeType[] {
    return Object.values(this.globalComponentNodes);
  }

  // 获取指定页面 pageId 的 componentNodes
  public getComponentNodes(
    pageId?: string | JsonTypePage,
    omitGlobal?: boolean,
  ): ComponentNodeType[] {
    pageId = typeof pageId === "string" ? pageId : pageId?.id;
    const pageComponentNodes = (pageId ? this.pageMap[pageId]?.children : []) || [];
    // 全局组件自动放在首部
    return omitGlobal
      ? pageComponentNodes
      : [...this.getGlobalComponentNodes(), ...pageComponentNodes];
  }

  // 设置页面的 componentNodes
  public setComponentNodes(pageId?: string | JsonTypePage, componentNodes?: ComponentNodeType[]) {
    pageId = typeof pageId === "string" ? pageId : pageId?.id;
    if (pageId && componentNodes && this.pageMap?.[pageId]?.children) {
      this.pageMap[pageId].children = componentNodes.filter((componentNode) => {
        // 如果是全局组件
        if (componentNode.isAllPage) {
          this.globalComponentNodes[componentNode.id] = componentNode;
        }
        return !componentNode.isAllPage;
      });
    }
  }

  // 获取所有pages
  public getAll(): JsonTypePage[] {
    return this.pages;
  }

  // 插入一个新页面
  public insert(page: JsonTypePage, parentId?: string | JsonTypePage) {
    this.pageMap[page.id] = { children: [] };
    if (!parentId) {
      this.pages.push(page);
      this.notifyChange();
      return;
    }
    parentId = typeof parentId === "string" ? parentId : parentId.id;
    const parentIndex = this.pages.findIndex((item) => item.id === parentId);
    if (parentIndex >= 0) {
      this.pages.splice(parentIndex + 1, 0, page);
      this.notifyChange();
    }
  }

  // 获取所有 componentNodes
  public getAllComponentNodes(): ComponentNodeType[] {
    return this.pages.reduce((list, page) => {
      return list.concat(this.getComponentNodes(page, true));
    }, this.getGlobalComponentNodes());
  }

  // 删除页面
  public delete(pageId?: string | string[]) {
    if (!pageId) return;
    const pageIds = Array.isArray(pageId) ? pageId : [pageId];
    this.pages = this.pages.filter((page) => {
      const isDelete = pageIds.includes(page.id);
      if (isDelete) {
        delete this.pageMap[page.id];
      }
      return !isDelete;
    });
    this.notifyChange();
  }
}
