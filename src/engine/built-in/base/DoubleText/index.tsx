/**
 * 双行文本
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { createComponent } from "@/engine";
import { TextOptions, DEFAULT_OPTIONS } from "./attributes";

export default createComponent<TextOptions>((props) => {
  const { options, width, height } = props;

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {options?.value_1 && (
        <div
          style={{
            background: options?.background_1,
            wordBreak: "break-all",
            textAlign: options?.textAlign_1,
            color: options?.color_1,
            fontWeight: options?.fontWeight_1,
            fontStyle: options?.fontStyle_1,
            fontSize: options?.fontSize_1,
            lineHeight: options?.lineHeight_1 ? `${options?.lineHeight_1}px` : undefined,
          }}
          dangerouslySetInnerHTML={{
            __html: options?.value_1,
          }}
        />
      )}
      {options?.value_2 && (
        <div
          style={{
            background: options?.background_2,
            wordBreak: "break-all",
            textAlign: options?.textAlign_2,
            color: options?.color_2,
            fontWeight: options?.fontWeight_2,
            fontStyle: options?.fontStyle_2,
            fontSize: options?.fontSize_2,
            lineHeight: options?.lineHeight_2 ? `${options?.lineHeight_2}px` : undefined,
          }}
          dangerouslySetInnerHTML={{
            __html: options?.value_2,
          }}
        />
      )}
    </div>
  );
}, DEFAULT_OPTIONS);
