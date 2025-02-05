/**
 * ComponentNode 图标展示组件
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { ComponentType } from "@/engine";
import React, { useEffect, useState } from "react";

interface ImageIconProps {
  src?: ComponentType["icon"];
  style?: React.CSSProperties;
}
export default function ComponentNodeImage(props: ImageIconProps) {
  const { src } = props;
  const [iconUrl, setIconUrl] = useState<string>("");

  useEffect(() => {
    switch (typeof src) {
      case "string":
        setIconUrl(src);
        break;
      case "function":
        src().then((module) => {
          setIconUrl(module.default);
        });
        break;
      default:
        break;
    }
  }, [src]);

  return src ? (
    <img style={props?.style} src={iconUrl} draggable={false} />
  ) : (
    <span style={{ color: "#b8b8b8" }}>None</span>
  );
}
