import ConfigRender from "@/components/ConfigRender";
import { SliderBaseProps } from "antd/es/slider";
import { Slider } from "antd";
import { ResetButton } from "@/components/Attributes";

type OptionsType = SliderBaseProps & {
  reset?: boolean; // 是否支持重置
};

export default () => {
  ConfigRender.register("slider", (props) => {
    const { reset = true } = props as OptionsType;
    return (
      <div
        style={{
          width: "100%",
          paddingLeft: 4,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Slider
          style={{ flex: 1, margin: "4px 8px" }}
          min={0}
          max={100}
          {...(props?.options as OptionsType)}
          value={props?.value}
          onChange={props?.onChange}
        />
        {reset && (
          <ResetButton
            onClick={() => {
              props.onChange(0);
            }}
          />
        )}
      </div>
    );
  });
};
