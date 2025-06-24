import ConfigRender from "@/components/ConfigRender";
import ICustomSelect, { ICustomSelectProps } from "@/components/ICustomSelect";

type OptionsType = ICustomSelectProps;

export default () => {
  ConfigRender.register("select", (props) => {
    return (
      <ICustomSelect
        style={{ width: "100%" }}
        {...(props?.options as OptionsType)}
        value={props.value}
        onChange={props.onChange}
      />
    );
  });
};
