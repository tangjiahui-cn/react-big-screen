/**
 * Background（背景）
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { ComponentProps } from "@/engine";
import React from "react";

type Props = ComponentProps<{}> & React.CSSProperties;

export default function (props: Props) {
  const { options, width, height } = props;
  const { ...style } = options;
  return <div style={{ width, height, ...style }} />;
}
