import styles from "./index.module.less";
import Header from "@/pages/components/Header";
import Menu from "@/pages/components/Menu";
import Editor from "@/pages/components/Editor";
import Attributes from "@/pages/components/Attributes";
import { JsonType, Engine } from "@/engine";
import React from "react";
import { useGlobalShortCutKeys } from "@/packages/shortCutKeys";

interface Props {
  json?: JsonType;
  engine: Engine;
  footer?: React.ReactNode;
  onJSONLoad?: () => void;
}

export default function (props: Props) {
  const { engine, json } = props;

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
        <Header />
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
      {props?.footer}
    </div>
  );
}
