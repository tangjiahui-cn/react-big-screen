/**
 * 切换示例按钮
 *
 * @author tangjiahui
 * @date 2025/6/26
 */
import { Button, Dropdown } from "antd";
import { loadExampleJson } from "@/utils";

export default function ChooseExampleButton() {
  return (
    <Dropdown
      menu={{
        items: [
          { label: <span style={{ fontSize: 12 }}>经典大屏</span>, key: "classic" },
          {
            label: <span style={{ fontSize: 12 }}>表格查询</span>,
            key: "multiple-components-interactive",
          },
        ],
        onClick({ key: jsonName }) {
          loadExampleJson(jsonName);
        },
      }}
    >
      <Button size={"small"} style={{ fontSize: 12 }} id={"choose-example-button"}>
        切换示例
      </Button>
    </Dropdown>
  );
}
