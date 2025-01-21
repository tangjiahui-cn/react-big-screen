/**
 * Image（图片）
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Image } from "antd";
import { ComponentProps } from "@/engine";

type Props = ComponentProps<{
  src?: string; // 图片地址
}>;

export default function (props: Props) {
  const { options, width, height } = props;
  return <Image src={options?.src} style={{ width, height }} />;
}
