/**
 * 页面容器
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import React, { ForwardedRef } from "react";
import { useCurrentPage } from "@/engine";

interface Props {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { options } = useCurrentPage() || {};
  return (
    <div
      ref={ref}
      className={props?.className}
      style={{
        background: options?.background,
        border: options?.bordered ? `1px solid ${options.borderColor}` : undefined,
        ...props?.style,
      }}
    >
      {props?.children}
    </div>
  );
});
