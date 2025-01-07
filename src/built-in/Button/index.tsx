/**
 * Button
 *
 * @author tangjiahui
 * @date 2024/12/25
 *
 */
import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { ComponentProps } from '@/engine';

type ButtonProps = ComponentProps<{
  type: ButtonType;
  children?: string;
}>;

export default function (props: ButtonProps) {
  const { options, width, height } = props;
  return (
    <Button type={options?.type} style={{ width, height }}>
      {options.children}
    </Button>
  );
}
