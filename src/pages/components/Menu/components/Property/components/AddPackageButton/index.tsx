/**
 * 新增组件包按钮
 *
 * @author tangjiahui
 * @date 2025/2/19
 */
import { Button, Dropdown, message } from "antd";
import React, { useRef } from "react";
import type { ComponentPackage } from "@/engine";
import { getLocalFileText, loadModuleFromText } from "@/utils";
import useAddRemoteTextDialog from "@/components/AddRemoteTextDialog";

// 下拉选项
const items = [
  { key: "local", label: <span className={"theme-text"}>本地上传</span> },
  { key: "remote", label: <span className={"theme-text"}>远程导入</span> },
] as const;

type ItemKey = (typeof items)[number]["key"];

interface Props {
  children?: React.ReactNode;
  onAdd?: (pkg: ComponentPackage, sourceCode: string) => void; // 新增一个package回调
}

export default function AddPackageButton(props: Props) {
  const pkgRef = useRef<ComponentPackage>();
  const pkgCodeRef = useRef<string>("");

  const addRemoteTextDialog = useAddRemoteTextDialog({
    onOk({ url }) {
      if (!pkgRef.current) {
        message.warn("package新增失败");
        return;
      }
      pkgRef.current.origin = "remote";
      pkgRef.current.originData = url;
      emitChangeAdd(pkgRef.current, pkgCodeRef.current);
    },
  });

  function emitChangeAdd(pkg?: ComponentPackage, sourceCode?: string) {
    if (!pkg) return message.warn("模块为空");
    props?.onAdd?.(pkg, sourceCode || "");
  }

  async function handleOperate(key: ItemKey) {
    switch (key) {
      // 本地上传文件
      case "local":
        const text = await getLocalFileText({ accept: "text/javascript" });
        const pkg: ComponentPackage | undefined = await loadModuleFromText(text);
        if (!pkg) {
          message.warn("文本内容必须为UMD或者AMD格式");
          return;
        }
        pkg.origin = "local";
        emitChangeAdd(pkg, text);
        break;
      // 读取远程文件
      case "remote":
        addRemoteTextDialog.open({
          async beforeOk(content: string) {
            pkgCodeRef.current = content;
            pkgRef.current = await loadModuleFromText(content);
            if (!pkgRef.current) {
              message.warn("文本内容必须为UMD或者AMD格式");
            }
            return !!pkgRef.current;
          },
        });
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
        <Button size={"small"} style={{ fontSize: 12 }} type={"primary"}>
          {props?.children}
        </Button>
      </Dropdown>
      {addRemoteTextDialog.children}
    </>
  );
}
