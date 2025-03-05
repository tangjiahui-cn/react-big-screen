/**
 * 新增组件包按钮
 *
 * @author tangjiahui
 * @date 2025/2/19
 */
import { Button, Dropdown, message } from "antd";
import React, { useRef } from "react";
import type { ComponentPackage } from "@/engine";
import { getFileText, getLocalFile, loadModuleFromText } from "@/utils";
import useAddRemoteTextDialog from "@/components/AddRemoteTextDialog";
import jszip from "jszip";

// 下拉选项
const items = [
  { key: "local", label: <span className={"theme-text"}>本地上传</span> },
  { key: "remote", label: <span className={"theme-text"}>远程导入</span> },
] as const;

type ItemKey = (typeof items)[number]["key"];

interface Props {
  children?: React.ReactNode;
  onAdd?: (pkg: ComponentPackage, sourceCode: string) => void; // 新增一个package
  onAddSome?: (pkgs: ComponentPackage[], sourceCodes: string[]) => void; // 新增多个package
}

export default function AddPackageButton(props: Props) {
  const pkgRef = useRef<ComponentPackage>();
  const pkgCodeRef = useRef<string>("");

  // 读取远程文本弹窗
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
    if (!pkg) return message.warn("不包含组件包");
    props?.onAdd?.(pkg, sourceCode || "");
  }

  function emitChangeAddSome(pkgs: ComponentPackage[], sourceCodes: string[]) {
    if (!pkgs?.length) return message.warn("不包含组件包");
    props?.onAddSome?.(pkgs, sourceCodes);
  }

  // 导入zip
  async function loadZip(file: File): Promise<{
    codes: string[];
    pkgs: ComponentPackage[];
  }> {
    const blob = new Blob([file], { type: file.type });
    const zip = new jszip();
    const zipData = await zip.loadAsync(blob);
    const files = zipData?.files || {};
    // 解析出的组件包列表
    const pkgs: ComponentPackage[] = [];
    // 组件包对应源代码列表
    const codes: string[] = [];
    // 读取压缩包内第一层文件
    for (const fileName in files) {
      if (!fileName?.endsWith?.(".js")) {
        continue;
      }
      // 只读取.js结尾的文件
      const file = files[fileName];
      const fileText = await file.async("text");
      const pkg: ComponentPackage | undefined = await loadModuleFromText(fileText);
      if (pkg) {
        pkg.origin = "local";
        pkgs.push(pkg);
        codes.push(fileText);
      }
    }
    return {
      pkgs,
      codes,
    };
  }

  async function handleOperate(key: ItemKey) {
    let fileText: string = "";
    switch (key) {
      // 本地上传文件
      case "local":
        const file = await getLocalFile({ accept: "text/javascript,application/zip" });
        if (!file) {
          return;
        }
        // 导入zip压缩包
        if (["application/x-zip-compressed", "application/zip"].includes(file?.type!)) {
          const { pkgs, codes } = await loadZip(file);
          emitChangeAddSome(pkgs, codes);
          return;
        }
        // 导入js文件
        if (file?.type === "text/javascript") {
          fileText = await getFileText(file);
          const pkg: ComponentPackage | undefined = await loadModuleFromText(fileText);
          if (!pkg) {
            return message.warn("文本内容必须为UMD或者AMD格式");
          }
          pkg.origin = "local";
          emitChangeAdd(pkg, fileText);
          return;
        }
        message.warn("只能上传 .js 和 .zip 文件");
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
