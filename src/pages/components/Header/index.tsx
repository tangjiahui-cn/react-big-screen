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
  SaveOutlined,
  SettingOutlined,
  ClearOutlined,
  QuestionCircleOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import TooltipButton from "@/components/TooltipButton";
import { Button, message } from "antd";
import IconFont from "@/components/IconFont";
import SizeBar from "./components/SizeBar";
import { getLocalFileText, downloadText } from "@/utils";
import ShortCutKeysDescription from "./components/ShortCutKeysDescription";
import { cancelUndoHistory, saveLocal, undoHistory } from "@/packages/shortCutKeys";
import { useTranslation } from "react-i18next";
import { changeLanguage, LANGUAGE } from "@/i18n";
import { isIgnoreDomainName } from "@/utils/ignore";
import ChooseExampleButton from "./components/ChooseExampleButton";
import StepDriverButton from "./components/StepDriverButton";
import { useEngineContext } from "@/export/context";
import { useHistoryData } from "@/engine";

interface OperateItem {
  key: string;
  disabled?: boolean;
  description?: any;
  icon?: React.ReactNode;
}

const isIgnoreGithub = isIgnoreDomainName();
export default function Header() {
  const { engine, rbsEngine } = useEngineContext();
  const [t, i18n] = useTranslation();
  const historyData = useHistoryData();
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
        disabled: !historyData.isCanGoBack,
        icon: <IconFont type={"icon-undo"} />,
      },
      {
        key: "cancelUndo",
        description: t("head.cancelUndo"),
        disabled: !historyData.isCanGoForward,
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
      // { key: "preview", description: t("head.preview"), icon: <DesktopOutlined /> },
    ];
  }, [i18n.language, historyData.isCanGoForward, historyData.isCanGoBack]);

  function handleJumpGithub() {
    window.open("https://github.com/tangjiahui-cn/react-big-screen.git");
  }

  async function handlePreview() {
    rbsEngine?.emit("startPreview", engine);
  }

  function handleOperate(item: OperateItem) {
    switch (item.key) {
      case "undo": // 撤销
        undoHistory();
        break;
      case "cancelUndo": // 反撤销
        cancelUndoHistory();
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
        handlePreview();
        break;
      case "save": // 保存
        saveLocal();
        break;
      case "clear":
        engine.clear();
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
        {!isIgnoreGithub && (
          <GithubFilled style={{ cursor: "pointer", fontSize: 16 }} onClick={handleJumpGithub} />
        )}
      </div>

      <SizeBar />

      <div className={styles.header_flex}>
        <ChooseExampleButton />
        <StepDriverButton />
        <div className={styles.header_flex_btnContainer} id={"rbs-tool-bar"}>
          {operates.map((item: OperateItem) => {
            return (
              <TooltipButton
                key={item.key}
                disabled={item?.disabled}
                title={item.description}
                onClick={() => handleOperate(item)}
              >
                {item?.icon}
              </TooltipButton>
            );
          })}
        </div>
        <Button
          type={"primary"}
          size={"small"}
          style={{ fontSize: 12 }}
          id={"rbs-preview"}
          onClick={handlePreview}
        >
          开始预览
        </Button>
      </div>
    </div>
  );
}
