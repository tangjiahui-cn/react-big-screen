/**
 * Title (标题)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { createComponent } from "@/engine";

interface Options {
  value: string; // 文字内容
}

export default createComponent<Options>((props) => {
  const { options, width, height } = props;
  const { value, ...style } = options;
  return (
    <div
      style={{
        width,
        height,
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: options?.value,
      }}
    />
  );
});
