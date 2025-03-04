/**
 * History
 *
 * @author tangjiahui
 * @date 2025/3/4
 * @description 历史记录。
 */
import styles from "./index.module.less";
import IEmpty from "@/components/IEmpty";
import { useHistoryData } from "@/engine/hooks";
import { goHistory, undoHistory } from "@/packages/shortCutKeys";
import classNames from "classnames";
import engine from "@/engine";

export default function Library() {
  const historyData = useHistoryData();
  const currentStepId = historyData.current?.stepId;

  function handleClickStepId(stepId: string) {
    if (engine.history.isPass(stepId) && currentStepId === stepId) {
      // 如果是最近的isPass的历史记录，则撤销
      undoHistory();
    } else {
      // 如果不是最新的历史记录记录，则选中
      goHistory(stepId);
    }
  }

  return (
    <div className={styles.history}>
      {historyData?.list?.map?.((item) => {
        return (
          <div
            key={item.stepId}
            className={classNames(styles.history_item, !item.isPass && styles.history_item_gray)}
            onClick={() => {
              handleClickStepId(item.stepId);
            }}
          >
            {item.description}
          </div>
        );
      })}
      {!historyData?.list?.length && <IEmpty />}
    </div>
  );
}
