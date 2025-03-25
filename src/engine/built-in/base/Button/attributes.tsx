/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributes } from "@/engine";
import { AttrContainer, IInput, Line } from "@/components/Attributes";
import { ButtonProps } from "antd";
import ICustomSelect from "@/components/ICustomSelect";

const typeList: ButtonOptions["type"][] = ["primary", "default", "dashed", "ghost", "text", "link"];

export const DEFAULT_OPTIONS = {
  value: "标题",
};

export interface ButtonOptions {
  type: ButtonProps["type"];
  value: string; // 标题内容
}

export default createAttributes<ButtonOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"内容"}>
        <IInput
          style={{ width: "100%" }}
          value={options?.value}
          onChange={(value) => {
            onChange({
              value,
            });
          }}
        />
      </Line>
      <Line label={"类型"}>
        <ICustomSelect
          style={{ width: "100%" }}
          value={options?.type}
          requestFn={async () => {
            return typeList.map((type) => ({
              label: type,
              value: type,
            }));
          }}
          onChange={(type: any) => {
            onChange({
              type,
            });
          }}
        />
      </Line>
    </AttrContainer>
  );
}, DEFAULT_OPTIONS);
