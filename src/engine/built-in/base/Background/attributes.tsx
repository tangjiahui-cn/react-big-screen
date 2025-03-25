/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributes } from "@/engine";
import { AttrContainer, IColorPicker, Line } from "@/components/Attributes";

export const DEFAULT_OPTIONS = {
  background: "#223447",
};

export interface BackgroundOptions {
  background: string; // 背景颜色
}

export default createAttributes<BackgroundOptions>((props) => {
  const { options, onChange } = props;
  return (
    <AttrContainer>
      <Line label={"标题"}>
        <IColorPicker
          style={{ width: "100%" }}
          value={options?.background}
          onChange={(background) => {
            onChange({
              background,
            });
          }}
        />
      </Line>
    </AttrContainer>
  );
}, DEFAULT_OPTIONS);
