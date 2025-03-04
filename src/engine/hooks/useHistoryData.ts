/**
 * useHistory
 *
 * @author tangjiahui
 * @date 2025/2/10
 * @description 查询历史
 */
import { useEffect, useState } from "react";
import { HistoryData } from "@/packages/historyRecord/types";
import engine from "@/engine";

export function useHistoryData() {
  const [historyData, setHistoryData] = useState<HistoryData>(() => {
    return engine.history.getHistoryData();
  });

  useEffect(() => {
    engine.history.onChange((historyData) => {
      setHistoryData(historyData);
    });
  }, []);

  return historyData;
}
