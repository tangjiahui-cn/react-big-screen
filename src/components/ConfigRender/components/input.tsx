import ConfigRender from "@/components/ConfigRender";
import { IInput, IInputProps } from "@/components/Attributes";

type OptionsType = IInputProps;

export default () => {
  // 输入框
  ConfigRender.register("input", (props) => {
    return (
      <IInput {...(props?.options as OptionsType)} value={props.value} onChange={props.onChange} />
    );
  });
};
