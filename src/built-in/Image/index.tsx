/**
 * Image
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Image } from "antd";
import { ComponentProps } from "@/engine";

type ImageProps = ComponentProps<{
  src?: string; // 图片地址
}>;

export default function (props: ImageProps) {
  const { options, width, height } = props;
  return <Image src={options?.src} style={{ width, height }} />;
}
