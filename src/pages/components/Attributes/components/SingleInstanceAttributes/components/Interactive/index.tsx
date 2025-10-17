/**
 * Interactive
 *
 * @author tangjiahui
 * @date 2025/2/10
 * @description 组件间交互
 */
import { LineConfigProvider } from "@/components/Attributes";
import styles from "./index.module.less";
import { useSingleSelectedInstance } from "../..";
import TriggerEventButton from "./components/TriggerEventButton";
import EventList from "./components/EventList";
import { useEngineContext } from "@/export/context";

export default function () {
  const { engine } = useEngineContext();
  const { componentNode } = useSingleSelectedInstance();

  return (
    <LineConfigProvider labelSpan={5}>
      <div className={styles.interactive}>
        {/* 新增按钮 */}
        <TriggerEventButton
          componentNode={componentNode}
          onSelect={(key) => {
            engine.componentNode.update(componentNode?.id, (config) => {
              return {
                events: [
                  ...(config?.events || []),
                  {
                    triggerId: key,
                    targets: [],
                  },
                ],
              };
            });
          }}
        />
        {/* 展示events列表 */}
        <EventList componentNode={componentNode} />
      </div>
    </LineConfigProvider>
  );
}
