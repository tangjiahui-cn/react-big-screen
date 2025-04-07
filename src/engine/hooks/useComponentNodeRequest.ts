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
import { useListenRef } from "@/hooks";

type DataSource = any;
export function useComponentNodeRequest(componentNode: ComponentNodeType): {
  dataSource: DataSource;
  requestInstance: {
    // 重新载入
    reload: () => void;
    // 立刻请求一次
    request: (params?: Record<string, any>, noCache?: boolean) => Promise<any>;
  };
} {
  const { dataSourceType = "static" } = componentNode;
  const isStaticRef = useListenRef(dataSourceType === "static"); // 是否静态数据
  const requestManagerRef = useRef<RequestManager>();

  // 接口请求数据
  const [dataSource, setDataSource] = useState<any>();

  // 获取唯一 requestManager 实例
  const getRequestManager: () => RequestManager | undefined = useCallback(() => {
    if (!requestManagerRef.current) {
      requestManagerRef.current = new RequestManager(componentNode.request);
      requestManagerRef.current?.onChangeDataSource((dataSource) => setDataSource(dataSource));
    }
    return requestManagerRef.current;
  }, [componentNode.dataSourceType]);

  useEffect(() => {
    // 静态数据不需要设置请求
    if (isStaticRef.current) {
      return;
    }
    // 清空上一次的数据
    if (dataSource) {
      setDataSource(undefined);
    }
    // 初始化一次request
    getRequestManager();
    return () => {
      requestManagerRef?.current?.unmount();
      requestManagerRef.current = undefined;
    };
  }, [componentNode?.dataSourceType]);

  const requestInstance = useMemo(() => {
    return {
      reload() {
        // 静态数据不能获取
        if (isStaticRef.current) {
          return;
        }
        // 更新原组件时，componentNode对象地址未变，所以可以取到实时的 request 属性值。
        getRequestManager()?.reload?.(componentNode.request);
      },
      async request(params?: Record<string, any>, noCache?: boolean): Promise<any> {
        // 静态数据不能获取
        if (isStaticRef.current) {
          return;
        }
        const options = noCache ? { useCache: false } : undefined;
        return Promise.resolve(
          getRequestManager()?.request?.(params, componentNode.request, options),
        );
      },
    };
  }, []);

  return {
    dataSource: isStaticRef.current ? componentNode?.staticDataSource : dataSource?.[0],
    requestInstance,
  };
}
