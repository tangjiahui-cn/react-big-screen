import ConfigRender from "@/components/ConfigRender";
import { IColorPicker, IColorPickerProps, ResetButton } from "@/components/Attributes";

type OptionsType = IColorPickerProps & {
  defaultColor?: string; // 默认颜色（resetColor默认重置此）
  reset?: string; // 是否支持重置
  resetColor?: string; // 重置颜色
};

export default () => {
  ConfigRender.register("colorPicker", (props) => {
    const {
      defaultColor = "white", // 默认颜色（resetColor默认重置此）
      reset, // 是否支持重置
      resetColor, // 重置颜色
    } = (props?.options as OptionsType) || {};
    const children = (
      <IColorPicker
        style={{ width: "100%" }}
        {...(props?.options as OptionsType)}
        value={props.value || defaultColor}
        onChange={props.onChange}
      />
    );
    // 显示重置按钮
    if (reset) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {children}
          <ResetButton
            onClick={() => {
              props.onChange(resetColor || defaultColor || "#fff");
            }}
          />
        </div>
      );
    }
    return children;
  });
};
