/**
 * Button（按钮）
 *
 * @author tangjiahui
 * @date 2024/12/25
 *
 */
import { Button } from "antd";
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, ButtonOptions } from "./attributes";

export default createComponent<ButtonOptions>((props) => {
  const { options, width, height } = props;
  return (
    <Button type={options?.type} style={{ width, height }}>
      <span
        dangerouslySetInnerHTML={{
          __html: options.value || "",
        }}
      />
    </Button>
  );
}, DEFAULT_OPTIONS);
