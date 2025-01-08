/**
 * 运行时行为实例
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来控制运行时的每个实例的各种行为，例如：鼠标经过、鼠标选中效果等。
 */

import type { InstanceType } from "..";

export default class Instance {
  // 存储 id => instance 的映射
  private data: Record<string, InstanceType> = {};
  // 存储选中的实例列表
  private selectedInstances: InstanceType[] = [];

  // 注册一个实例
  public registerInstance(instance: InstanceType) {
    this.data[instance.id] = instance;
  }

  // 取消注册一个实例
  public unregisterInstance(id: string) {
    delete this.data[id];
  }

  // 取消选中所有选中实例
  public unSelectAllSelectedInstances() {
    this.selectedInstances.forEach((instance) => {
      instance.handleUnSelected();
    });
  }

  // 新增一个选中实例
  public addSelectedInstance(instance: InstanceType) {
    this.selectedInstances.push(instance);
  }

  // 移出一个选中实例
  public removeSelectedInstance(id: string) {
    this.selectedInstances = this.selectedInstances.filter((instance) => {
      return instance.id !== id;
    });
  }
}
