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
    request: (params?: Record<string, any>) => void;
  };
} {
  const requestManagerRef = useRef<RequestManager>();
  const [dataSource, setDataSource] = useState<any>();

  const getRequestManager: () => RequestManager | undefined = useCallback(() => {
    if (componentNode.request && !requestManagerRef.current) {
      requestManagerRef.current = new RequestManager(componentNode.request);
      requestManagerRef.current?.onChangeDataSource((dataSource) => setDataSource(dataSource));
    }
    return requestManagerRef.current;
  }, []);

  useEffect(() => {
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
          getRequestManager()?.reload?.(componentNode.request);
        },
        request(params?: Record<string, any>) {
          getRequestManager()?.request?.(params);
        },
      },
    };
  }, [dataSource]);
}
