/**
 * GetSizeContainer
 *
 * @author tangjiahui
 * @date 2025/2/28
 * @description 获取大小的容器
 */
import { useMemo, useRef, useState } from "react";
import { throttle } from "lodash-es";
import { useResizeDom } from "@/hooks";

interface Size {
  width: number;
  height: number;
}

interface GetSizeContainerProps {
  style?: React.CSSProperties;
  className?: string;
  children: (size: Size) => React.ReactNode;
}

export default function GetSizeContainer(props: GetSizeContainerProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>();

  const handleSizeChange = useMemo(
    () =>
      throttle((size: Size) => {
        setSize(size);
      }, 10),
    [],
  );

  useResizeDom(domRef, (entries) => {
    handleSizeChange(entries?.[0]?.contentRect);
  });

  return (
    <div ref={domRef} style={props?.style} className={props?.className}>
      {size && props?.children?.(size)}
    </div>
  );
}
