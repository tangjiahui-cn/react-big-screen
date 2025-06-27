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
import { getUrlQuery, getExampleJsonText, startDriver } from "@/utils";

// 获取初始加载json
async function getInitJSONString(): Promise<string> {
  const { example } = getUrlQuery();
  if (example) return getExampleJsonText(example);
  // 默认使用经典大屏示例 classic.json
  return localStorage.getItem("json") || (await getExampleJsonText("classic"));
}

export default function Page() {
  // 注册全局快捷键
  useGlobalShortCutKeys();

  useEffectOnce(() => {
    // 获取初始加载json字符串
    getInitJSONString().then((jsonStr: string) => {
      // 读取json
      engine.loadJSONString(jsonStr);
      startDriver();
    });
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
