/**
 * 运行时行为实例
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来控制运行时的每个实例的各种行为，例如：鼠标经过、鼠标选中效果等。
 */

import type { InstanceType } from '..';

export default class Instance {
  // 存储 id => instance 的映射
  data: Record<string, InstanceType> = {};

  // 注册一个实例
  public registerInstance(instance: InstanceType) {
    this.data[instance.id] = instance;
  }

  // 取消注册一个实例
  public unregisterInstance(id: string) {
    delete this.data[id];
  }

  public getInstance(id: string): InstanceType | undefined {
    return this.data[id];
  }

  public getInstances(ids: string[]): (InstanceType | undefined)[] {
    return ids.map((id) => {
      return this.data[id];
    });
  }
}
