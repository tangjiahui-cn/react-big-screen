/**
 * 编辑页面
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import React from "react";
import { RbsEngine } from "@/export";
import { getExampleJsonText, getUrlQuery, openRoute, startDriver } from "@/utils";
import { saveLocalPreviewJson } from "@/pages/preview";
import Footer from "./components/Footer";

// 获取初始加载json
async function getInitJSONString(): Promise<string> {
  const { example } = getUrlQuery();
  if (example) return getExampleJsonText(example);
  // 默认使用经典大屏示例 classic.json
  return localStorage.getItem("json") || (await getExampleJsonText("classic"));
}

export default function Page() {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rbsEngine = new RbsEngine({
      pageFooter: <Footer />,
    });
    rbsEngine.mount(domRef.current!).then(async () => {
      startDriver();
      const jsonStr = await getInitJSONString();
      await rbsEngine.importJSONString(jsonStr);
    });

    // 监听“点击开始预览”事件
    rbsEngine.on("startPreview", async (engine) => {
      const json = await engine.getJSON();
      saveLocalPreviewJson(json);
      openRoute("/preview");
    });

    return () => {
      rbsEngine.destroy();
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}
