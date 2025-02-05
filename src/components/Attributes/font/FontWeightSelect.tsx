/**
 * 字重下拉框
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import ICustomSelect, { ICustomSelectProps } from "@/components/ICustomSelect";

export function FontWeightSelect(props: ICustomSelectProps) {
  return (
    <ICustomSelect
      {...props}
      size={"small"}
      allowClear={true}
      requestFn={async () => {
        return [
          { label: "细", value: "lighter" },
          { label: "正常", value: "normal" },
          { label: "粗", value: "bold" },
        ];
      }}
      optionRender={(item) => {
        return <div style={{ fontWeight: item?.value }}>{item?.label}</div>;
      }}
    />
  );
}
