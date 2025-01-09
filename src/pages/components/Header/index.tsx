/**
 * Header
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import React from "react";
import {
  UploadOutlined,
  VerticalAlignBottomOutlined,
  GithubFilled,
  DesktopOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import TooltipButton from "@/components/TooltipButton";
import { message } from "antd";
import IconFont from "@/components/IconFont";
import SizeBar from "./components/SizeBar";
import engine from "@/engine";
import { getLocalFileText, saveToFile } from "@/utils";

interface OperateItem {
  key: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

const operates: OperateItem[] = [
  { key: "undo", description: "撤销", disabled: true, icon: <IconFont type={"icon-undo"} /> },
  {
    key: "cancelRevoke",
    description: "取消撤销",
    disabled: true,
    icon: <IconFont type={"icon-cancel-undo"} />,
  },
  { key: "export", description: "导出", icon: <UploadOutlined /> },
  { key: "import", description: "导入", icon: <VerticalAlignBottomOutlined /> },
  { key: "preview", description: "预览", disabled: true, icon: <DesktopOutlined /> },
  { key: "save", description: "保存到本地", disabled: true, icon: <SaveOutlined /> },
  { key: "settings", description: "设置", disabled: true, icon: <SettingOutlined /> },
];

export default function Header() {
  function handleJumpGithub() {
    window.open("https://github.com/tangjiahui-cn/big-screen.git");
  }

  function handleOperate(item: OperateItem) {
    switch (item.key) {
      case "undo": // 撤销
        message.warn("暂不支持撤销");
        break;
      case "cancelRevoke": // 反撤销
        message.warn("暂不支持取消撤销");
        break;
      case "export": // 导出
        const text: string = JSON.stringify(engine.getJSON());
        saveToFile(text, "大屏看板.json");
        break;
      case "import": // 导入
        getLocalFileText().then((text) => {
          if (!text) {
            return message.warn("文件内容不能为空");
          }
          try {
            const json = JSON.parse(text);
            engine.loadJSON(json);
          } catch {
            message.error("请上传json格式文件");
          }
        });
        break;
      case "preview": // 预览
        break;
      case "save": // 保存
        console.log("zz 保存 -->", engine.getJSON());
        break;
      case "settings":
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_flex}>
        <b>BigScreen</b>
        <GithubFilled style={{ cursor: "pointer", fontSize: 16 }} onClick={handleJumpGithub} />
      </div>

      <SizeBar />

      <div className={styles.header_flex}>
        {operates.map((item: OperateItem) => {
          return (
            <TooltipButton
              key={item.key}
              disabled={item?.disabled}
              title={item.description}
              onClick={() => handleOperate(item)}
            >
              {item.icon}
            </TooltipButton>
          );
        })}
      </div>
    </div>
  );
}
