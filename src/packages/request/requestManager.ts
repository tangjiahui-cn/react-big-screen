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

    if (!currentRequest?.url) {
      return;
    }

    if (currentRequest?.first) {
      this.request();
    }

    if (currentRequest?.loop) {
      this.timerId = setInterval(() => {
        this.request();
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
  public async request(
    params?: Record<string, any>, // 查询参数
    requestConfig?: RequestManagerRequest, // 使用其他 requestConfig
    requestOptions?: {
      // request的options选项
      useCache?: boolean; // 是否启用缓存
      ttl?: number; // 缓存时间（单位：ms）
    },
  ): Promise<any> {
    const currentRequestConfig = requestConfig || this.requestConfig;
    if (!currentRequestConfig?.url) {
      console.warn("[bigScreen]: request.url not exist.");
      return Promise.resolve(undefined);
    }
    // 鉴于大屏的特殊性（简单/快速/统一），接口参数都采用url查询参数格式
    return requestFn(`${currentRequestConfig?.url || ""}`, {
      ...requestOptions,
      method: `${currentRequestConfig?.method || "get"}`,
      params,
    }).then((dataSource) => {
      this.notifyDataSource(dataSource);
      return dataSource;
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
