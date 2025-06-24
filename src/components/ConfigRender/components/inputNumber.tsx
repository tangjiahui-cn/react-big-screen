import ConfigRender from "@/components/ConfigRender";
import { IInputNumber, IInputNumberProps } from "@/components/Attributes";

type OptionsType = IInputNumberProps;

export default () => {
  ConfigRender.register("inputNumber", (props) => {
    return (
      <IInputNumber
        style={{ width: "100%" }}
        {...(props?.options as OptionsType)}
        value={props.value}
        onChange={props.onChange}
      />
    );
  });
};
