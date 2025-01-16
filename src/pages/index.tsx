/**
 * Page
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import Header from "./components/Header";
import Attributes from "./components/Attributes";
import Editor from "./components/Editor";
import Library from "./components/Library";
import engine from "@/engine";
import { useEffectOnce } from "@/hooks";
import { useGlobalShortCutKeys } from "@/shortCutKeys";

export default function Page() {
  // 注册全局快捷键
  useGlobalShortCutKeys();

  useEffectOnce(() => {
    // 读取本地json
    engine.loadJSONString(localStorage.getItem("json"));
    // unmount
    return () => {
      engine.component.unRegisterAll();
    };
  });

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Header />
      </div>
      <div className={styles.page_body}>
        <div className={styles.page_body_left}>
          <Library />
        </div>
        <div className={styles.page_body_main}>
          <Editor />
        </div>
        <div className={styles.page_body_right}>
          <Attributes />
        </div>
      </div>
      {/*<div className={styles.page_footer}>底部区域</div>*/}
    </div>
  );
}
