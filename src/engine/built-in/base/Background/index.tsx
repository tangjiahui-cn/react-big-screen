/**
 * Background（背景）
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import React from "react";
import { createComponent } from "@/engine";

interface Options {
  style?: React.CSSProperties;
}

export default createComponent<Options>((props) => {
  const { options, width, height } = props;
  const { ...style } = options;
  return <div style={{ width, height, ...style }} />;
});
