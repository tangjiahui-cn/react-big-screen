/**
 * Button（按钮）
 *
 * @author tangjiahui
 * @date 2024/12/25
 *
 */
import { Button } from "antd";
import { ButtonType } from "antd/es/button";
import { createComponent } from "@/engine";

interface Options {
  type: ButtonType;
  children?: string;
}

export default createComponent<Options>((props) => {
  const { options, width, height } = props;
  return (
    <Button type={options?.type} style={{ width, height }}>
      {options.children}
    </Button>
  );
});
