import ConfigRender from "@/components/ConfigRender";
import { TextAlignSelect, TextAlignSelectProps } from "@/components/Attributes";

export default () => {
  ConfigRender.register("textAlignSelect", (props) => {
    return (
      <TextAlignSelect
        style={{ width: "100%" }}
        {...(props?.options as TextAlignSelectProps)}
        value={props.value}
        onChange={props?.onChange}
      />
    );
  });
};
