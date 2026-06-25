/**
 * RBS模块 JS-SDK 入口
 *
 * @author tangjiahui
 * @date 2025/10/16
 * @description 流程: new RbsEngin() => mount() => importJSON/importJSONString() => destroy()
 */
import { JsonType, Engine, EngineOptions } from "@/engine";
import { createRoot, Root } from "react-dom/client";
import React from "react";
import { EngineContext } from "@/export/context";
import { RbsEditorProps } from "@/export/components/RenderEditor";

const GLOBAL_ENGINE_KEY = "_$_rbs_current_engine_$_";
const RenderEditor = React.lazy(() => import("./components/RenderEditor"));
const RenderPreview = React.lazy(() => import("./components/RenderPreview"));

// RBS 默认hook事件类型
export type RbsHookType = "startPreview";
export type * from "../engine/types";
export * from "./resources";
export { startDriver } from "@/utils";
export { defaultPackage } from "@/engine";

export type RbsEngineOptions = Pick<
  RbsEditorProps,
  "pageLogo" | "pageToolBar" | "pageFooter" | "toolBarOptions"
> & {
  /** 挂载 dom */
  dom?: HTMLElement;
  /** 激活全局（但实例请确保为true，此选项为多实例优化时使用） */
  activeGlobal?: boolean;
  /** 开始预览 hook */
  onStartPreview?: (engine: Engine) => void;
};

export class RbsEngine {
  /** react createApp */
  private app: Root | null = null;
  /** 挂载元素 */
  private el: HTMLElement | null = null;
  /** 实际渲染引擎 */
  public engine: Engine;
  /** 操作模式（编辑/预览） */
  public mode: "edit" | "preview" = "edit";
  /** 事件钩子 */
  private hooks: Map<RbsHookType, ((payload?: any) => void)[]> | null = null;
  /** 保存当前操作的json */
  private lastJson: JsonType | undefined = undefined;
  /** options */
  public options: RbsEngineOptions;

  constructor(options?: RbsEngineOptions & EngineOptions) {
    const {
      activeGlobal = true,
      onStartPreview,
      dom,
      pageFooter,
      pageLogo,
      pageToolBar,
      toolBarOptions,
      ...rest
    } = options || {};

    // 格式化options
    this.options = {
      activeGlobal,
      onStartPreview,
      dom,
      pageFooter,
      pageLogo,
      pageToolBar,
      toolBarOptions,
    };

    // 初始化
    this.engine = new Engine(rest);
    if (dom) {
      this.mount(dom);
    }
    if (activeGlobal) {
      this.activeGlobal();
    }
    if (onStartPreview) {
      this.on("startPreview", onStartPreview);
    }
  }

  /**
   * 挂载dom（会触发编辑器渲染）
   * @param el 待挂载到的dom
   */
  public async mount(el: HTMLElement) {
    if (this.el) {
      console.error("RBS el has been mounted.");
      return;
    }
    this.el = el;
    return this.importJSON(this.lastJson);
  }

  /**
   * 取消挂载dom
   * @description 与destroy的区别是会保留json的状态，重新挂载dom即可重新渲染。
   */
  public async unmount() {
    if (!this.app) return;
    this.lastJson = await this.engine.getJSON();
    this.app.unmount();
    this.app = null;
    this.el = null;
  }

  /**
   * 监听事件
   * @param type 事件类型
   * @param callback 事件回调函数
   */
  public on(type: RbsHookType, callback: (engine: Engine) => void) {
    if (!this.hooks) this.hooks = new Map();
    const arr = this.hooks.get(type) || [];
    arr.push(callback);
    this.hooks.set(type, arr);
  }

  /**
   * 触发事件
   * @param type 事件类型
   * @param payload 传参
   */
  public emit(type: RbsHookType, payload: any) {
    this.hooks?.get?.(type)?.forEach?.((callback) => {
      callback?.(payload);
    });
  }

  /**
   * 启用预览模式（需在importJSON之前使用）
   */
  public enablePreview() {
    this.mode = "preview";
  }

  /**
   * 启用编辑模式（需在mount之前使用）
   */
  public enableEdit() {
    this.mode = "edit";
  }

  /**
   * 销毁
   */
  public async destroy() {
    // 取消全局引用
    this.unActiveGlobal();
    // 卸载app
    await this.unmount();
    // 销毁engine
    this.engine.destroy();
    this.hooks = null;
    this.lastJson = undefined;
  }

  /**
   * 导入JSONString（会触发渲染）
   * @param text json的文本格式
   */
  public async importJSONString(text: string): Promise<void> {
    if (!text) return;
    try {
      const json = JSON.parse(text || "{}");
      return this.importJSON(json);
    } catch (e) {
      throw e;
    }
  }

  /**
   * 导入json（会触发渲染）
   * @param json json格式数据
   */
  public async importJSON(json?: JsonType): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.el) {
          throw new Error("el not found.");
        }
        if (!this.app) {
          this.app = createRoot(this.el!);
          if (this.mode === "edit") {
            // 渲染编辑模式
            this.app.render(
              <EngineContext.Provider value={{ engine: this.engine, rbsEngine: this }}>
                <RenderEditor
                  json={json}
                  engine={this.engine}
                  onJSONLoad={resolve}
                  pageToolBar={this.options?.pageToolBar}
                  pageFooter={this.options?.pageFooter}
                  pageLogo={this.options?.pageLogo}
                  toolBarOptions={this.options?.toolBarOptions}
                />
              </EngineContext.Provider>,
            );
          } else if (this.mode === "preview") {
            // 渲染预览模式
            this.app.render(
              <EngineContext.Provider value={{ engine: this.engine, rbsEngine: this }}>
                <RenderPreview json={json} engine={this.engine} onJSONLoad={resolve} />
              </EngineContext.Provider>,
            );
          }
        } else {
          this.engine.loadJSON(json).then(() => resolve());
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * 导出json文件
   */
  public async exportJSON(): Promise<JsonType> {
    return this.engine.getJSON();
  }

  /**
   * 激活全局对象
   */
  public activeGlobal() {
    // @ts-ignore
    window[GLOBAL_ENGINE_KEY] = this.engine;
  }

  /**
   * 取消激活全局对象（慎用！单实例情况下会导致报错）
   */
  public unActiveGlobal() {
    // @ts-ignore
    if (window[GLOBAL_ENGINE_KEY] === this.engine) {
      // @ts-ignore
      delete window[GLOBAL_ENGINE_KEY];
    }
  }

  /**************************** static *************************/
  // 获取档当前激活的 engine
  public static getActiveEngine(): Engine | undefined {
    // @ts-ignore
    const engine = window[GLOBAL_ENGINE_KEY];
    if (!engine) {
      console.warn("RBS engine is not activated.");
    }
    return engine;
  }
}
