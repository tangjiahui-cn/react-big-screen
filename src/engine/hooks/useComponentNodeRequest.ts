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
    request: (params?: Record<string, any>, noCache?: boolean) => Promise<any>;
  };
} {
  const { dataSourceType = "static" } = componentNode;
  const requestManagerRef = useRef<RequestManager>();
  const [dataSource, setDataSource] = useState<any>(() => {
    return dataSourceType === "static" ? componentNode?.staticDataSource : undefined;
  });

  // 获取唯一 requestManager 实例
  const getRequestManager: () => RequestManager | undefined = useCallback(() => {
    if (!requestManagerRef.current) {
      requestManagerRef.current = new RequestManager(componentNode.request);
      requestManagerRef.current?.onChangeDataSource((dataSource) => setDataSource(dataSource));
    }
    return requestManagerRef.current;
  }, [componentNode.dataSourceType]);

  const isFirstRef = useRef(true);
  useEffect(() => {
    // 静态数据，不走请求
    if (dataSourceType === "static") {
      // 第一次不需要设置（因为初始化时已经赋值了）
      if (!isFirstRef.current) {
        setDataSource(componentNode.staticDataSource);
      }
      return;
    }
    // 如果上一次是静态数据，则清除
    if (dataSource) {
      setDataSource(undefined);
    }
    // 初始化一次request
    getRequestManager();
    isFirstRef.current = false;
    return () => {
      requestManagerRef?.current?.unmount();
      requestManagerRef.current = undefined;
    };
  }, [componentNode?.dataSourceType]);

  const requestInstance = useMemo(() => {
    return {
      reload() {
        // 更新原组件时，componentNode对象地址未变，所以可以取到实时的 request 属性值。
        getRequestManager()?.reload?.(componentNode.request);
      },
      request(params?: Record<string, any>, noCache?: boolean): Promise<any> {
        const options = noCache ? { useCache: false } : undefined;
        return Promise.resolve(
          getRequestManager()?.request?.(params, componentNode.request, options),
        );
      },
    };
  }, []);

  return {
    dataSource,
    requestInstance,
  };
}
