/**
 * RequestManager
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
// 请求数据函数
import { ComponentRequest } from "@/engine";
import requestFn from "./request";

type RequestManagerRequest = ComponentRequest;
type RequestManagerCallback = (dataSource: any) => void;
export class RequestManager {
  private timerId: any;
  private requestConfig?: RequestManagerRequest;
  private callbackList: RequestManagerCallback[] = [];

  constructor(requestConfig?: RequestManagerRequest) {
    if (!requestConfig) return;
    this.reload(requestConfig);
  }

  private notifyDataSource(dataSource: any) {
    this.callbackList.forEach((cb) => cb(dataSource));
  }

  // 重新生效配置
  public reload(requestConfig?: RequestManagerRequest) {
    this.clear();
    const currentRequest = requestConfig
      ? (this.requestConfig = requestConfig)
      : this.requestConfig;
    if (currentRequest?.first) {
      this.request().then((dataSource) => {
        this.notifyDataSource(dataSource);
      });
    }

    if (currentRequest?.loop) {
      this.timerId = setInterval(() => {
        this.request().then((dataSource) => {
          this.notifyDataSource(dataSource);
        });
      }, currentRequest?.loopDelay || 1000);
    }
  }

  // 清除运行时数据
  private clear() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  // 立刻请求一次
  public async request(params?: Record<string, any>) {
    return requestFn(`${this.requestConfig?.url || ""}`, {
      method: `${this.requestConfig?.method || "get"}`,
      params,
    });
  }

  // 卸载
  public unmount() {
    this.callbackList = [];
    this.requestConfig = undefined;
    this.clear();
  }

  // 监听数据变化
  public onChangeDataSource(callback: RequestManagerCallback) {
    this.callbackList.push(callback);
    return () => {
      this.callbackList = this.callbackList.filter((cb) => cb !== callback);
    };
  }
}
