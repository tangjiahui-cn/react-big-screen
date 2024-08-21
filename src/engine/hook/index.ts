/**
 * Hook
 *
 * @author tangjiahui
 * @date 2024/8/21
 */
import { BaseEvent } from '../model';

export default class Hook {
  private event = new BaseEvent();

  private createHook(key: string) {
    const that = this;
    return function (fn: (payload?: any) => void) {
      that.event.on(key, fn);
    };
  }

  private createNotify(key: string) {
    const that = this;
    return function (payload?: any) {
      that.event.notify(key, payload);
    };
  }

  onSelectInstanceList = this.createHook('onSelectInstanceList');
  notifySelectInstanceList = this.createNotify('onSelectInstanceList');
}
