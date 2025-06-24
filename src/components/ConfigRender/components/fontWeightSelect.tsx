import ConfigRender from "@/components/ConfigRender";
import { FontWeightSelect, FontWeightSelectProps } from "@/components/Attributes";

type OptionsType = FontWeightSelectProps;

export default () => {
  ConfigRender.register("fontWeightSelect", (props) => {
    return (
      <FontWeightSelect
        style={{ width: "100%" }}
        {...(props?.options as OptionsType)}
        value={props.value}
        onChange={props.onChange}
      />
    );
  });
};
