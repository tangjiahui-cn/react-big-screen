/**
 * Image（图片）
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Image } from "antd";
import { createComponent } from "@/engine";

interface Options {
  src?: string; // 图片地址
}

export default createComponent<Options>((props) => {
  const { options, width, height } = props;
  return <Image src={options?.src} style={{ width, height }} />;
});
