/**
 * Text (文字)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { ComponentProps } from "@/engine";
import { TextOptions } from "./attributes";
import { useMemo } from "react";

type Props = ComponentProps<TextOptions>;

export default function Text(props: Props) {
  const { options, width, height, dataSource } = props;
  const { value } = options;

  useMemo(() => {
    console.log("zz Text组件 dataSource:  ", dataSource);
  }, [dataSource]);

  return (
    <div
      style={{
        width,
        height,
        color: options?.color || "black",
        fontWeight: options?.fontWeight,
        fontStyle: options?.fontStyle,
        fontSize: options?.fontSize,
        lineHeight: options?.lineHeight ? `${options?.lineHeight}px` : undefined,
      }}
      dangerouslySetInnerHTML={{
        __html: value || "",
      }}
    />
  );
}
