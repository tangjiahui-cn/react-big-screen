/**
 * 基本增删查改数据库
 *
 * @author tangjiahui
 * @date 2025/1/10
 * @description
 * (1) 为什么数据设置为object格式？
 * 答：新增时直接覆盖即可。而不用数据格式的新增需要“先遍历删除再新增”，尽可能减少遍历步骤。
 */
import { InstanceType } from "@/engine";

export type BaseInstanceData = Record<string, InstanceType>;
export type BaseInstanceDataChangeCallback = (payload: BaseInstanceData) => void;
export type BaseInstanceDataChangeUnmount = () => void;
export default class BaseInstance {
  private _size: number = 0;
  private _data: BaseInstanceData = {};
  private _events: BaseInstanceDataChangeCallback[] = [];

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
    this.notify();
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
    this.notify();
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
    let isExist = false;
    const ids: (string | undefined)[] = Array.isArray(id) ? id : [id];
    ids.forEach((id) => {
      if (id) {
        const data: InstanceType | undefined = this._data[id];
        if (data) {
          isExist = true;
          delete this._data[id];
          this._size--;
        }
      }
    });
    if (isExist) {
      this.notify();
    }
  }

  // 删除全部实例
  public deleteAll(): void {
    if (!this._size) {
      return;
    }
    this._size = 0;
    this._data = {};
    this.notify();
  }

  // 获取大小
  public getSize(): number {
    return this._size;
  }

  // 监听数据变更
  public onChange(callback: BaseInstanceDataChangeCallback): BaseInstanceDataChangeUnmount {
    this._events.push(callback);
    return () => {
      this._events = this._events.filter((cb) => cb !== callback);
    };
  }

  // 触发数据变更
  private notify() {
    this._events.forEach((cb) => {
      cb(this._data);
    });
  }
}
