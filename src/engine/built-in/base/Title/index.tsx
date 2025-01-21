/**
 * Title (标题)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { ComponentProps } from "@/engine";
import React from "react";

type Props = ComponentProps<{
  value: string; // 文字内容
}> &
  React.CSSProperties;

export default function Title(props: Props) {
  const { options, width, height } = props;
  const { value, ...style } = options;
  return (
    <div
      style={{
        width,
        height,
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: options?.value,
      }}
    />
  );
}
