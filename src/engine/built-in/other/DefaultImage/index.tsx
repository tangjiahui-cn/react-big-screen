/**
 * 预置图片
 *
 * @author tangjiahui
 * @date 2025/6/25
 */
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, ScrollListOptions } from "./attributes";
import React from "react";
import { getLazyImage } from "./lazyImage";

export default createComponent<ScrollListOptions>((props) => {
  const { width, height, options } = props;
  const [src, setSrc] = React.useState<string>();

  React.useEffect(() => {
    getLazyImage(options?.id).then((url) => {
      setSrc(url);
    });
  }, [options?.id]);

  return src ? (
    <img style={{ width, height, pointerEvents: "none" }} alt={"预制图片"} src={src} />
  ) : (
    <></>
  );
}, DEFAULT_OPTIONS);
