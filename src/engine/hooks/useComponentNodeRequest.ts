/**
 * useComponentNodeRequest
 *
 * @author tangjiahui
 * @date 2025/2/10
 * @description 负责组件接口请求，用于处理componentNode.request
 */
import { ComponentNodeType } from "@/engine";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RequestManager } from "@/packages/request";

type DataSource = any;
export function useComponentNodeRequest(componentNode: ComponentNodeType): {
  dataSource: DataSource;
  requestInstance: {
    // 重新载入
    reload: () => void;
    // 立刻请求一次
    request: (params?: Record<string, any>) => Promise<any>;
  };
} {
  const requestManagerRef = useRef<RequestManager>();
  const [dataSource, setDataSource] = useState<any>();

  // 获取唯一 requestManager 实例
  const getRequestManager: () => RequestManager | undefined = useCallback(() => {
    if (!requestManagerRef.current) {
      requestManagerRef.current = new RequestManager(componentNode.request);
      requestManagerRef.current?.onChangeDataSource((dataSource) => setDataSource(dataSource));
    }
    return requestManagerRef.current;
  }, []);

  useEffect(() => {
    // 初始化一次request
    getRequestManager();
    return () => {
      requestManagerRef?.current?.unmount();
    };
  }, []);

  return useMemo(() => {
    return {
      dataSource,
      requestInstance: {
        reload() {
          // 更新原组件时，componentNode对象地址未变，所以可以取到实时的 request 属性值。
          getRequestManager()?.reload?.(componentNode.request);
        },
        request(params?: Record<string, any>): Promise<any> {
          return Promise.resolve(getRequestManager()?.request?.(params, componentNode.request));
        },
      },
    };
  }, [dataSource]);
}
