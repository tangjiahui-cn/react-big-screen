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
import engine, { JsonType } from "@/engine";
import { useEffectOnce } from "@/hooks";
import { useGlobalShortCutKeys } from "@/packages/shortCutKeys";
import { cloneDeep } from "lodash-es";
import { getUrlQuery, getUrlText } from "@/utils";

// 获取示例json文本
async function getExampleJsonString(name: string): Promise<string> {
  const text = await getUrlText(`./example/${name}.json`);
  return text.startsWith("<!DOCTYPE html>") ? "" : text;
}

// 获取初始加载json
async function getInitJSONString(): Promise<string> {
  const { example } = getUrlQuery();
  if (example) return getExampleJsonString(example);
  return localStorage.getItem("json") || "";
}

export default function Page() {
  // 注册全局快捷键
  useGlobalShortCutKeys();

  useEffectOnce(() => {
    // 获取初始加载json字符串
    getInitJSONString().then((jsonStr: string) => {
      // 读取json
      engine.loadJSONString(jsonStr, (json: JsonType) => {
        // 初始化历史记录
        engine.history.setInitData(cloneDeep(json));
      });
    });
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
