/**
 * 子页面管理
 *
 * @author tangjiahui
 * @date 2025/2/25
 */
import { ComponentNodeType, JsonTypePage } from "@/engine";

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
      children: ComponentNodeType[]; // page包含的componentNodes
    }
  > = {};
  private listeners: Listener[] = [];

  // 触发pages变更
  private notifyChange() {
    const pages = this.getAll();
    this.listeners.forEach((cb) => {
      cb(pages);
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
    this.pages = pages?.length ? pages : [DEFAULT_PAGE];
    this.pageMap[DEFAULT_PAGE.id] = { children: [] };
    componentNodes.forEach((componentNode) => {
      const pageId = componentNode?.pageId || DEFAULT_PAGE.id;
      (this.pageMap[pageId] ||= { children: [] }).children.push(componentNode);
    });
    this.pages.forEach((page) => {
      this.pageMap[page.id] ||= { children: [] };
    });
    this.notifyChange();
  }

  // 获取指定页面 pageId 的 componentNodes
  public getComponentNodes(pageId?: string | JsonTypePage): ComponentNodeType[] {
    pageId = typeof pageId === "string" ? pageId : pageId?.id;
    if (!pageId) return [];
    return this.pageMap[pageId]?.children || [];
  }

  // 设置 componentNodes
  public setComponentNodes(pageId?: string | JsonTypePage, componentNodes?: ComponentNodeType[]) {
    pageId = typeof pageId === "string" ? pageId : pageId?.id;
    if (pageId && this.pageMap?.[pageId]?.children) {
      this.pageMap[pageId].children = componentNodes || [];
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
      return list.concat(this.getComponentNodes(page));
    }, [] as ComponentNodeType[]);
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
