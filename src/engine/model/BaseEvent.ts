/**
 * 发布-订阅事件模型
 *
 * At 2023/11/07
 * By TangJiaHui
 */

export type BaseEventCallBack<T = any> = (payload?: T) => void;
type BaseEventItem = {
  // 回调函数
  callback: BaseEventCallBack;
  // 是否仅触发一次
  once?: boolean;
};

export class BaseEvent<T = any, KEY = any> {
  private map = new Map<KEY, BaseEventItem[]>();

  // 监听事件
  public on(key?: KEY, callback?: BaseEventCallBack<T>, once?: boolean) {
    if (!key) throw new Error("key is not exist.");
    if (!callback) throw new Error("key is not exist.");

    const itemList = this.map.get(key);
    const item: BaseEventItem = {
      once,
      callback,
    };

    if (itemList) {
      itemList.push(item);
    } else {
      this.map.set(key, [item]);
    }
  }

  // 监听事件（执行一次后销毁）
  public once(key?: KEY, callback?: BaseEventCallBack) {
    if (!key) throw new Error("key is not exist.");
    if (!callback) throw new Error("key is not exist.");

    this.on(key, callback, true);
  }

  // 发布变更
  public notify(key?: KEY, payload?: T) {
    if (!key) throw new Error("key is not exist.");

    const itemList = this.map.get(key);
    if (itemList) {
      const list = itemList.filter((item) => {
        item?.callback?.(payload);
        return !item?.once;
      });

      // 执行完毕后，列表是否为空
      if (!list?.length) {
        this.map.delete(key);
        return;
      }

      // 执行完毕后，是否执行了once的事件
      if (list?.length !== itemList?.length) {
        this.map.set(key, list);
      }
    }
  }

  // 删除一个事件
  public remove(key?: KEY, callback?: BaseEventCallBack) {
    if (!key) throw new Error("key is not exist.");
    if (!callback) throw new Error("key is not exist.");

    const itemList = this.map.get(key);
    if (itemList && callback) {
      const list = itemList.filter((item) => item.callback !== callback);
      if (list.length !== itemList.length) {
        this.map.set(key, list);
      }
    }
  }

  // 删除一个key对应的所有事件
  public removeKey(key?: KEY) {
    if (!key) throw new Error("key is not exist.");
    this.map.delete(key);
  }

  // 清空
  public clear() {
    this.map.clear();
  }
}
