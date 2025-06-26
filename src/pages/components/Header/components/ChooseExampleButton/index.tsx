/**
 * 切换示例按钮
 *
 * @author tangjiahui
 * @date 2025/6/26
 */
import { Button, Dropdown, message } from "antd";
import { getUrlText } from "@/utils";
import engine from "@/engine";

// 载入示例json
async function loadExample(jsonName: string) {
  const text = await getUrlText(`./example/${jsonName}.json`);
  const jsonStr = text.startsWith("<!DOCTYPE html>") ? "" : text;
  if (!jsonStr) {
    return message.error("读取失败");
  }
  // 读取json
  engine.loadJSONString(jsonStr);
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
          loadExample(jsonName);
        },
      }}
    >
      <Button size={"small"} style={{ fontSize: 12 }}>
        切换示例
      </Button>
    </Dropdown>
  );
}
