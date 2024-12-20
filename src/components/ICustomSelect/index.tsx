import { default as CustomSelect, CustomSelectProps } from './CustomSelect';

type OmitKeys = 'value' | 'onChange' | 'defaultFirst';
export type ICustomMultipleSelectProps = Omit<CustomSelectProps, OmitKeys> & {
  /** if multiple */
  multiple: boolean;
  /** max tag count */
  maxTagCount?: number;
  /** value */
  value?: string[];
  /** onChange */
  onChange?: (key?: string[], value?: string[], dataMap?: any) => void;
};

export type ICustomSelectProps = CustomSelectProps | ICustomMultipleSelectProps;

export function ICustomMultipleSelect(props: ICustomMultipleSelectProps) {
  const { value, onChange, ...rest } = props;
  return (
    <CustomSelect
      {...rest}
      value={value}
      onChange={onChange}
      extAntdProps={{
        mode: 'multiple',
        maxTagCount: props?.maxTagCount ?? 1,
        ...props?.extAntdProps,
      }}
    />
  );
}

export function ICustomSelect(props: ICustomSelectProps) {
  const Template: any = (props as any)?.multiple ? ICustomMultipleSelect : CustomSelect;
  return <Template {...props} />;
}

export default ICustomSelect;
