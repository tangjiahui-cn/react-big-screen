import ConfigRender from "@/components/ConfigRender";
import { Checkbox, CheckboxProps } from "antd";

type OptionsType = CheckboxProps & {
  empty?: any;
};

export default () => {
  ConfigRender.register("checkboxValue", (props) => {
    const { value = "", empty = undefined } = (props?.options as OptionsType) || {};
    return (
      <Checkbox
        {...(props?.options as OptionsType)}
        checked={props.value === value}
        onChange={(e) => {
          props.onChange?.(e.target.checked ? value : empty);
        }}
      />
    );
  });
};
