/**
 * 编辑页面
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import Header from "./components/Header";
import Attributes from "./components/Attributes";
import Editor from "./components/Editor";
import Menu from "./components/Menu";
import engine from "@/engine";
import { useEffectOnce } from "@/hooks";
import { useGlobalShortCutKeys } from "@/packages/shortCutKeys";

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
          <Menu />
        </div>
        <div className={styles.page_body_main}>
          <Editor />
        </div>
        <div className={styles.page_body_right}>
          <Attributes />
        </div>
      </div>
      {!__DEV__ && (
        <div className={styles.page_footer}>
          <a href={"https://beian.miit.gov.cn"} target={"_blank"} rel='noreferrer'>
            浙ICP备2024117433号-2
          </a>
        </div>
      )}
    </div>
  );
}
