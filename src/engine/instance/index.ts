/**
 * 运行时行为实例
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来控制运行时的每个实例的各种行为，例如：鼠标经过、鼠标选中效果等。
 */
import { InstanceType } from "..";
import BaseInstance from "./BaseInstance";

export default class Instance extends BaseInstance {
  // 存储选中的实例列表
  private selectedInstances: BaseInstance = new BaseInstance();

  // 获取实例
  private getInstances(
    id: string | string[] | InstanceType | InstanceType[],
  ): (InstanceType | undefined)[] {
    if (!id) return [];
    if (typeof id === "string") return id ? [this.get(id)] : [];
    if (Array.isArray(id)) {
      if (!id?.length) return [];
      if (typeof id?.[0] === "string") {
        return this.get(id as string[]);
      }
      return id as InstanceType[];
    }
    return [id]; // InstanceType
  }

  /**
   * 选中实例
   * @param id 待选中实例的key/keys/instance/instances
   * @param cover 是否覆盖（默认false。true则重置整个选中实例，false则新增选中）
   */
  public select(id: string | string[] | InstanceType | InstanceType[], cover?: boolean): void {
    if (cover) {
      // 取消选中全部
      this.selectedInstances.getAll().forEach((instance) => {
        instance.handleUnSelected?.();
      });
    }

    // 选中对应实例
    const instances: (InstanceType | undefined)[] = this.getInstances(id);
    instances.forEach((instance?: InstanceType) => {
      instance?.handleSelected?.();
    });

    // 设置选中
    if (cover) {
      // 设置选中实例
      this.selectedInstances.set(instances);
    } else {
      this.selectedInstances.add(instances);
    }
  }

  // 取消选中实例
  public unselect(id: string | string[] | InstanceType | InstanceType[]) {
    const instances: (InstanceType | undefined)[] = this.getInstances(id);
    const instanceIds: (string | undefined)[] = [];
    instances.forEach((instance?: InstanceType) => {
      instance?.handleUnSelected?.();
      instanceIds.push(instance?.id);
    });
    this.selectedInstances.delete(instanceIds);
  }

  // 选中全部
  public selectAll() {
    if (this.isSelectAll()) return;
    this.select(this.getAll());
  }

  // 取消选中全部
  public unselectAll() {
    if (!this.selectedInstances.getSize()) return;
    this.selectedInstances.getAll().forEach((instance) => {
      instance?.handleUnSelected?.();
    });
    this.selectedInstances.deleteAll();
  }

  // 是否已选中全部
  public isSelectAll(): boolean {
    const size = this.getSize();
    const selectedSize = this.selectedInstances.getSize();
    return size ? size === selectedSize : false;
  }

  // 查询id是否被选中
  public isSelected(id: string): boolean {
    return !!this.selectedInstances.get(id);
  }
}
