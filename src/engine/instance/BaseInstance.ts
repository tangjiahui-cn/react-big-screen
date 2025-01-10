/**
 * 基本增删查改数据库
 *
 * @author tangjiahui
 * @date 2025/1/10
 */
import { InstanceType } from "@/engine";

export type BaseInstanceData = Record<string, InstanceType>;
export default class BaseInstance {
  private _size: number = 0;
  private _data: BaseInstanceData = {};

  // 覆盖设置
  public set(instances: (InstanceType | undefined)[]) {
    let size = 0;
    const data: BaseInstanceData = {};
    instances.forEach((instance?: InstanceType) => {
      if (instance) {
        data[instance.id] = instance;
        size++;
      }
    });
    this._data = data;
    this._size = size;
  }

  // 新增实例
  public add(instance: undefined | InstanceType | (InstanceType | undefined)[]): void {
    if (!instance) {
      return;
    }
    if (Array.isArray(instance)) {
      instance.forEach((instance) => this.add(instance));
      return;
    }
    this._data[instance.id] = instance;
    this._size++;
  }

  // 取出实例
  public get(id: string): InstanceType | undefined;
  public get(id: string[]): (InstanceType | undefined)[];
  public get(id: string | string[]): InstanceType | (InstanceType | undefined)[] | undefined {
    if (Array.isArray(id)) {
      return id.map((value) => this.get(value)) as (InstanceType | undefined)[];
    }
    return this._data[id];
  }

  // 取出全部实例
  public getAll(): InstanceType[] {
    return Object.values(this._data);
  }

  // 删除实例
  public delete(id: string | (string | undefined)[]) {
    const ids: (string | undefined)[] = Array.isArray(id) ? id : [id];
    ids.forEach((id) => {
      if (id) {
        delete this._data[id];
        this._size--;
      }
    });
  }

  // 删除全部实例
  public deleteAll(): void {
    this._size = 0;
    this._data = {};
  }

  // 获取大小
  public getSize(): number {
    return this._size;
  }
}
