/**
 * 页面容器
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import React, { ForwardedRef } from "react";
import engine, { useConfig, useCurrentPage } from "@/engine";
import InfiniteContainer from "@/packages/infiniteContainer";
import { zoomEditorDefault } from "@/packages/shortCutKeys";

interface Props {
  preview?: boolean; // 是否预览模式
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { options } = useCurrentPage() || {};
  const config = useConfig();

  const children = (
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
  );

  if (props?.preview) {
    return children;
  }

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
      onReset={() => {
        zoomEditorDefault();
      }}
    >
      {children}
    </InfiniteContainer>
  );
});
