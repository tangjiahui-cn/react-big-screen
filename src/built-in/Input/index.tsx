/**
 * Input
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Input } from 'antd';
import { ComponentProps } from '@/engine';

type InputProps = ComponentProps<{
  allowClear?: boolean; // 是否可清空
  defaultValue?: string; // 输入框默认值
  placeholder?: string; // 输入框提示语
}>;

export default function (props: InputProps) {
  const { options, width, height } = props;
  return (
    <Input
      style={{ width, height }}
      allowClear={options?.allowClear}
      defaultValue={options?.defaultValue}
      placeholder={options?.placeholder}
    />
  );
}
