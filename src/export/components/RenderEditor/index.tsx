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
      {!__DEV__ && (
        <div className={styles.page_footer}>
          <div className={styles.page_footer_beian}>
            <img src={"/beian.png"} />
            <a
              href='https://beian.mps.gov.cn/#/query/webSearch?code=33010602013871'
              rel='noreferrer'
              target='_blank'
            >
              浙公网安备33010602013871号
            </a>
          </div>
          <a href={"https://beian.miit.gov.cn"} target={"_blank"} rel='noreferrer'>
            浙ICP备2024117433号-2
          </a>
        </div>
      )}
    </div>
  );
}
