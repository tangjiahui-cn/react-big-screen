/**
 * 切换示例按钮
 *
 * @author tangjiahui
 * @date 2025/6/26
 */
import { Button, Dropdown } from "antd";
import { RbsEngine } from "@/export";

async function loadLocalExampleJSON(jsonName: any) {
  const json = await import(`@/../public/example/${jsonName}.json`);
  const engine = RbsEngine.getActiveEngine();
  engine?.loadJSON?.(json);
}

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
          loadLocalExampleJSON(jsonName);
        },
      }}
    >
      <Button size={"small"} style={{ fontSize: 12 }} id={"rbs-choose-example-button"}>
        切换示例
      </Button>
    </Dropdown>
  );
}
