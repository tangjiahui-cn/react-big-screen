import { IOption } from "@/components/ICustomSelect/type";
import ConfigRender from "@/components/ConfigRender";
import ICustomSelect, { ICustomSelectProps } from "@/components/ICustomSelect";

type OptionsType = ICustomSelectProps;

export default () => {
  const BTN_TYPE_OPTIONS: IOption[] = [
    { label: "主按钮", value: "primary" },
    { label: "默认", value: "default" },
    { label: "虚线", value: "dashed" },
    { label: "幽灵", value: "ghost" },
    { label: "文字", value: "text" },
    { label: "链接", value: "link" },
  ];
  ConfigRender.register("antdButtonTypeSelect", (props) => {
    return (
      <ICustomSelect
        style={{ width: "100%" }}
        {...(props?.options as OptionsType)}
        requestFn={async () => BTN_TYPE_OPTIONS}
        value={props.value}
        onChange={props?.onChange}
      />
    );
  });
};
