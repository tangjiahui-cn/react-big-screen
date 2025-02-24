/**
 * Header
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import React, { useMemo } from "react";
import {
  UploadOutlined,
  VerticalAlignBottomOutlined,
  GithubFilled,
  DesktopOutlined,
  SaveOutlined,
  SettingOutlined,
  ClearOutlined,
  QuestionCircleOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import TooltipButton from "@/components/TooltipButton";
import { message } from "antd";
import IconFont from "@/components/IconFont";
import SizeBar from "./components/SizeBar";
import engine from "@/engine";
import { getLocalFileText, downloadText } from "@/utils";
import ShortCutKeysDescription from "./components/ShortCutKeysDescription";
import { clearComponentNodes, saveLocal } from "@/packages/shortCutKeys";
import { saveLocalPreviewJson } from "@/pages/preview";
import { useTranslation } from "react-i18next";
import { changeLanguage, LANGUAGE } from "@/i18n";

// 打开新路由页面
function openRoute(routePath: string) {
  routePath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  window.open(`${window.location.origin}${window.location.pathname}#${routePath}`);
}

interface OperateItem {
  key: string;
  disabled?: boolean;
  description?: any;
  icon?: React.ReactNode;
}

export default function Header() {
  const [t, i18n] = useTranslation();
  const isChinese = i18n.language === LANGUAGE.zh;
  const operates = useMemo(() => {
    return [
      {
        key: "shortCutKeys",
        description: <ShortCutKeysDescription />,
        icon: <QuestionCircleOutlined />,
      },
      {
        key: "undo",
        description: t("head.undo"),
        disabled: true,
        icon: <IconFont type={"icon-undo"} />,
      },
      {
        key: "cancelUndo",
        description: t("head.cancelUndo"),
        disabled: true,
        icon: <IconFont type={"icon-cancel-undo"} />,
      },
      { key: "export", description: t("head.export"), icon: <UploadOutlined /> },
      { key: "import", description: t("head.import"), icon: <VerticalAlignBottomOutlined /> },
      { key: "save", description: t("head.save"), icon: <SaveOutlined /> },
      { key: "clear", description: t("head.clear"), icon: <ClearOutlined /> },
      {
        key: "language",
        description: t("head.language", { text: `${isChinese ? "切换英语" : "change chinese"}` }),
        icon: <TranslationOutlined />,
      },
      {
        key: "settings",
        description: t("head.settings"),
        disabled: true,
        icon: <SettingOutlined />,
      },
      { key: "preview", description: t("head.preview"), icon: <DesktopOutlined /> },
    ];
  }, [i18n.language]);

  function handleJumpGithub() {
    window.open("https://github.com/tangjiahui-cn/big-screen.git");
  }

  function handleOperate(item: OperateItem) {
    switch (item.key) {
      case "undo": // 撤销
        message.warn("暂不支持撤销");
        break;
      case "cancelUndo": // 反撤销
        message.warn("暂不支持取消撤销");
        break;
      case "export": // 导出
        engine.getJSON().then((json) => {
          const text: string = JSON.stringify(json);
          downloadText(text, "大屏看板.json");
        });
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
        engine.getJSON().then((json) => {
          saveLocalPreviewJson(json);
          openRoute("/preview");
        });
        break;
      case "save": // 保存
        saveLocal();
        break;
      case "clear":
        clearComponentNodes();
        break;
      case "settings":
        break;
      case "language":
        const language = isChinese ? "en" : "zh";
        changeLanguage(language);
        engine.config.setConfig({ language });
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
