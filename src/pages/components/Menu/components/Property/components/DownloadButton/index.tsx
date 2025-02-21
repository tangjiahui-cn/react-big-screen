/**
 * 下载下拉按钮
 *
 * @author tangjiahui
 * @date 2025/2/21
 */
import { Button, Dropdown } from "antd";
import React from "react";
import { downloadUrlText } from "@/utils";

// 下拉选项
const items = [
  { key: "umd-demo", label: <span className={"theme-text"}>下载示例组件包（UMD）</span> },
  { key: "amd-demo", label: <span className={"theme-text"}>下载示例组件包（AMD）</span> },
  { key: "all", label: <span className={"theme-text"}>下载全部资产</span> },
] as const;

type ItemKey = (typeof items)[number]["key"];

interface Props {
  children?: React.ReactNode;
  onDownloadAll?: () => void;
}

export default function DownloadButton(props: Props) {
  function handleOperate(key: ItemKey) {
    switch (key) {
      case "umd-demo":
        downloadUrlText("/demo.umd.js", "测试包2.js");
        break;
      case "amd-demo":
        downloadUrlText("/demo.amd.js", "测试包1.js");
        break;
      case "all":
        props?.onDownloadAll?.();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: items as any,
          onClick({ key }) {
            handleOperate(key as ItemKey);
          },
        }}
      >
        <Button size={"small"} style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
          {props?.children}
        </Button>
      </Dropdown>
    </>
  );
}
