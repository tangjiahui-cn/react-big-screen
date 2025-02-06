import { default as CustomSelect, CustomSelectProps } from "./CustomSelect";
import { DataMapType, ValueType } from "./type";

type OmitKeys = "value" | "onChange" | "defaultFirst";
export type ICustomMultipleSelectProps = Omit<CustomSelectProps, OmitKeys> & {
  /** if multiple */
  multiple: boolean;
  /** max tag count */
  maxTagCount?: number;
  /** value */
  value?: ValueType[];
  /** onChange */
  onChange?: (values?: ValueType[], labels?: string[], dataMap?: DataMapType) => void;
};

export type ICustomSelectProps = CustomSelectProps | ICustomMultipleSelectProps;

export function ICustomMultipleSelect(props: ICustomMultipleSelectProps) {
  const { value, onChange, extAntdProps, ...rest } = props;
  return (
    <CustomSelect
      {...rest}
      value={value as any}
      onChange={onChange as any}
      extAntdProps={{
        mode: "multiple",
        maxTagCount: props?.maxTagCount ?? 1,
        ...extAntdProps,
      }}
    />
  );
}

export function ICustomSelect(props: ICustomSelectProps) {
  const Template: any = (props as any)?.multiple ? ICustomMultipleSelect : CustomSelect;
  return <Template {...props} />;
}

export default ICustomSelect;
