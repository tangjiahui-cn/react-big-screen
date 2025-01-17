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
  ClearOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import TooltipButton from "@/components/TooltipButton";
import { message } from "antd";
import IconFont from "@/components/IconFont";
import SizeBar from "./components/SizeBar";
import engine from "@/engine";
import { getLocalFileText, saveToFile } from "@/utils";
import ShortCutKeysDescription from "./components/ShortCutKeysDescription";
import { clearComponentNodes, saveLocal } from "@/shortCutKeys";

interface OperateItem {
  key: string;
  disabled?: boolean;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

const operates: OperateItem[] = [
  {
    key: "shortCutKeys",
    description: <ShortCutKeysDescription />,
    icon: <QuestionCircleOutlined />,
  },
  { key: "undo", description: "撤销", disabled: true, icon: <IconFont type={"icon-undo"} /> },
  {
    key: "cancelRevoke",
    description: "取消撤销",
    disabled: true,
    icon: <IconFont type={"icon-cancel-undo"} />,
  },
  { key: "export", description: "导出", icon: <UploadOutlined /> },
  { key: "import", description: "导入", icon: <VerticalAlignBottomOutlined /> },
  { key: "save", description: "保存到本地", icon: <SaveOutlined /> },
  { key: "clear", description: "清空", icon: <ClearOutlined /> },
  { key: "settings", description: "设置", disabled: true, icon: <SettingOutlined /> },
  { key: "preview", description: "预览", icon: <DesktopOutlined /> },
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
        saveLocal(true);
        window.open(`${window.location.origin}/#/preview`);
        break;
      case "save": // 保存
        saveLocal();
        break;
      case "clear":
        clearComponentNodes();
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
