/**
 * Background（背景）
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, BackgroundOptions } from "./attributes";

export default createComponent<BackgroundOptions>((props) => {
  const { options, width, height } = props;
  return <div style={{ width, height, background: options.background }} />;
}, DEFAULT_OPTIONS);
