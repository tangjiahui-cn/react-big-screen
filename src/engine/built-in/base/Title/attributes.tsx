/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributes } from "@/engine";
import { AttrContainer, IInput, Line } from "@/components/Attributes";

export const DEFAULT_OPTIONS = {
  value: "标题",
};

export interface TitleOptions {
  value: string; // 标题内容
}

export default createAttributes<TitleOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"标题"}>
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
    </AttrContainer>
  );
}, DEFAULT_OPTIONS);
