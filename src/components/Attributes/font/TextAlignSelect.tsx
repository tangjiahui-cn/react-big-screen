/**
 * TextAlignSelect
 *
 * @author tangjiahui
 * @date 2025/3/14
 * @description 文字水平对齐方式选择下拉框。
 */
import ICustomSelect, { ICustomSelectProps } from "@/components/ICustomSelect";

export type TextAlignType = "left" | "center" | "right";
export type TextAlignSelectProps = ICustomSelectProps;

export function TextAlignSelect(props: TextAlignSelectProps) {
  return (
    <ICustomSelect
      {...props}
      requestFn={async () => {
        return [
          { label: "左对齐", value: "left" },
          { label: "居中对齐", value: "center" },
          { label: "右对齐", value: "right" },
        ];
      }}
    />
  );
}
