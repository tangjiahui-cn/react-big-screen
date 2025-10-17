/**
 * 编辑页面
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import React from "react";
import { RbsEngine } from "@/export";
import { JsonType } from "@/engine";

// 保存本地预览json数据
export function saveLocalPreviewJson(json: JsonType): void {
  localStorage.setItem("preview_json", JSON.stringify(json));
}

// 读取本地预览json数据
export async function getLocalPreviewJson(): Promise<JsonType | undefined> {
  let json: JsonType | undefined;
  try {
    json = JSON.parse(localStorage.getItem("preview_json") || "");
  } catch (e) {
    console.error(e);
    throw e;
  }
  return json;
}

export default function Page() {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rbsEngine = new RbsEngine();
    rbsEngine.enablePreview();
    rbsEngine.mount(domRef.current!).then(async () => {
      const json = await getLocalPreviewJson();
      rbsEngine.importJSON(json as any);
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
