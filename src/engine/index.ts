/**
 * 大屏 api
 *
 * @author tangjiahui
 * @date 2024/1/7
 *
 * 核心:
 *     编辑json + 交互逻辑。
 * 理念：
 *     数据与逻辑分离
 *
 * 流程：
 * （1）读取 json 中的 “componentNodes”、或通过 “component模板” 创建 “componentNode数据实例”。
 * （2）“componentNode数据实例” 渲染到画布时，注册 “instance运行时行为实例”。
 *
 * 定义：
 * （1）component：组件模板。用于创建一个 componentNode，仅仅作为模板使用。
 * （2）componentNode：组件可持久化数据实例。用于保存组件的数据配置，导出时会被保存。
 * （3）instance：组件运行时行为实例。用于控制运行时组件的行为，例如：鼠标经过、选中效果。
 * （4）实例：componentNode 和 instance 之和，即数据与行为的集合体。
 *
 * 关于：
 * （1）为什么要分离组件数据实例、行为实例，而不使用一个实例合并了全部？
 * 答：区分可持久化数据、运行时函数，职责分工避免混淆，并避免保存时分离两者所造成的性能损耗。
 */
import Component from "./component";
import Instance from "./instance";
import ComponentNode from "./componentNode";
import Config from "./config";
import type { JsonType } from "./types";

export type * from "./types";
export * from "./store";
export * from "./hooks";

class Engine {
  // 组件模板
  component: Component = new Component();
  // 组件数据实例
  componentNode: ComponentNode = new ComponentNode();
  // 组件行为实例
  instance: Instance = new Instance();
  // 全局配置
  config: Config = new Config();

  // 加载json对象
  public loadJSON(json: JsonType): void {
    this.config.setConfig(json.config);
    this.componentNode.init(json.componentNodes);
  }

  // 加载json字符串对象
  public loadJSONString(text?: string | null): void {
    try {
      const json = JSON.parse(text || "{}");
      this.loadJSON(json);
    } catch (e) {
      console.error(e);
    }
  }

  // 获取json对象
  public getJSON(): JsonType {
    return {
      used: this.componentNode.getComponentUsed(),
      componentNodes: this.componentNode.getAll(),
      config: this.config.getConfig(),
    };
  }
}

const engine = new Engine();
export default engine;
