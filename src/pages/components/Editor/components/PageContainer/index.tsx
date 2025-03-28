/**
 * 页面容器
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import React, { ForwardedRef } from "react";
import { useConfig, useCurrentPage } from "@/engine";

interface Props {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { options } = useCurrentPage() || {};
  const config = useConfig();

  return (
    <div
      ref={ref}
      className={props?.className}
      style={{
        background: options?.background,
        border: options?.bordered ? `1px solid ${options.borderColor}` : undefined,
        width: config.width,
        height: config.height,
        transform: config.scale && config.scale !== 1 ? `scale(${config.scale})` : undefined,
        ...props?.style,
      }}
    >
      {props?.children}
    </div>
  );
});
