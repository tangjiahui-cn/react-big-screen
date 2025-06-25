/**
 * 预置图片
 *
 * @author tangjiahui
 * @date 2025/6/25
 */
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, ScrollListOptions } from "./attributes";
import { useMemo } from "react";

export default createComponent<ScrollListOptions>((props) => {
  const { width, height, options } = props;
  const src = useMemo(() => `./default-images/${options?.id}`, [options?.id]);

  return <img style={{ width, height }} alt={"预制图片"} src={src} />;
}, DEFAULT_OPTIONS);
