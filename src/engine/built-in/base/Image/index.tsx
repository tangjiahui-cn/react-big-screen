/**
 * Image（图片）
 *
 * @author tangjiahui
 * @date 2025/1/7
 */
import { Image } from "antd";
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, ImageOptions } from "./attributes";

export default createComponent<ImageOptions>((props) => {
  const { options, width, height } = props;
  return (
    <Image
      src={options?.src}
      style={{ width, height, pointerEvents: "none" }}
      preview={!!options?.enablePreview}
    />
  );
}, DEFAULT_OPTIONS);
