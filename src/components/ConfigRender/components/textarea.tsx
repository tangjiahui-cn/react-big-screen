import ConfigRender from "@/components/ConfigRender";
import { ITextArea, ITextAreaProps } from "@/components/Attributes";

type OptionsType = ITextAreaProps;

export default () => {
  ConfigRender.register("textarea", (props) => {
    return (
      <ITextArea
        {...(props?.options as OptionsType)}
        value={props.value}
        onChange={props.onChange}
      />
    );
  });
};
