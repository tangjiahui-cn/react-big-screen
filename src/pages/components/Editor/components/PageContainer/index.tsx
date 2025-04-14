/**
 * 页面容器
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import React, { ForwardedRef } from "react";
import engine, { useConfig, useCurrentPage } from "@/engine";
import InfiniteContainer from "@/packages/infiniteContainer";

interface Props {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { options } = useCurrentPage() || {};
  const config = useConfig();
  return (
    <InfiniteContainer
      style={{ width: "100%", height: "100%" }}
      scale={config.scale}
      defaultScale={config.scaleDefault}
      scaleStep={config.scaleStep}
      offsetX={config.editorOffsetX}
      offsetY={config.editorOffsetY}
      scaleMax={config.scaleMaxZoom}
      scaleMin={config.scaleMinZoom}
      onChange={(scale, editorOffsetX, editorOffsetY) => {
        engine.config.setConfig({
          scale,
          editorOffsetX,
          editorOffsetY,
        });
      }}
    >
      <div
        ref={ref}
        className={props?.className}
        style={{
          background: options?.background,
          border: options?.bordered ? `1px solid ${options.borderColor}` : undefined,
          width: config.width,
          height: config.height,
          ...props?.style,
        }}
      >
        {props?.children}
      </div>
    </InfiniteContainer>
  );
});
