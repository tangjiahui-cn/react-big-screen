import styles from "./index.module.less";
import Header, { RbsEditorHeaderProps } from "@/pages/components/Header";
import Menu from "@/pages/components/Menu";
import Editor from "@/pages/components/Editor";
import Attributes from "@/pages/components/Attributes";
import { JsonType, Engine } from "@/engine";
import React from "react";
import { useGlobalShortCutKeys } from "@/packages/shortCutKeys";

export interface RbsEditorProps extends RbsEditorHeaderProps {
  /** json数据 */
  json?: JsonType;
  /** 低代码内核 */
  engine: Engine;
  /** 页面底部 */
  pageFooter?: React.FC | React.ReactNode;
  /** json加载完成回调 */
  onJSONLoad?: () => void;
}

export default function (props: RbsEditorProps) {
  const { engine, json, pageFooter: PageFooter } = props;

  // 注册快捷键
  useGlobalShortCutKeys();

  React.useEffect(() => {
    engine.loadJSON(json).then(() => {
      props?.onJSONLoad?.();
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Header
          pageLogo={props?.pageLogo}
          pageToolBar={props?.pageToolBar}
          toolBarOptions={props?.toolBarOptions}
        />
      </div>
      <div className={styles.page_body}>
        <div className={styles.page_body_left} id={"rbs-menu"}>
          <Menu />
        </div>
        <div className={styles.page_body_main} id={"rbs-editor"}>
          <Editor />
        </div>
        <div className={styles.page_body_right} id={"rbs-attributes"}>
          <Attributes />
        </div>
      </div>
      {typeof PageFooter === "function" ? <PageFooter /> : PageFooter}
    </div>
  );
}
