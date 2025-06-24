import ConfigRender from "@/components/ConfigRender";
import { Checkbox, CheckboxProps } from "antd";

type OptionsType = CheckboxProps;

export default () => {
  ConfigRender.register("checkbox", (props) => {
    return (
      <Checkbox
        {...(props?.options as OptionsType)}
        checked={props.value}
        onChange={(e) => props.onChange?.(e.target.checked)}
      />
    );
  });
};
