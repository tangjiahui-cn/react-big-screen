/**
 * DownloadJSONButton（下载 JSON）
 *
 * @author tangjiahui
 * @date 2026/10/22
 */
import { downloadText } from "@/utils";
import { useEngineContext } from "@/export/context";

/**
 * 下载当前页面 JSON
 */
export default function DownloadJSONButton() {
  const { engine } = useEngineContext();
  return (
    <button
      type={"button"}
      style={{
        padding: "2px 8px",
        color: "#fff",
        background: "#1890ff",
        border: "none",
        borderRadius: 2,
        fontSize: 12,
        lineHeight: 1.4,
        cursor: "pointer",
      }}
      onClick={() => {
        engine.getJSON().then((json) => {
          downloadText(JSON.stringify(json), "大屏看板.json");
        });
      }}
    >
      下载json
    </button>
  );
}
