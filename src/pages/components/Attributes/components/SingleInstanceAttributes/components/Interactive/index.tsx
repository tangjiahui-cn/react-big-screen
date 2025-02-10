/**
 * Interactive
 *
 * @author tangjiahui
 * @date 2025/2/10
 * @description 组件间交互
 */
import { Line, LineConfigProvider } from "@/components/Attributes";
import styles from "./index.module.less";
// import { useSingleSelectedInstance } from "../..";
import ComponentNodesSelect from "@/components/ComponentNodesSelect";
import ICustomSelect from "@/components/ICustomSelect";

export default function () {
  // const { componentNode } = useSingleSelectedInstance();

  return (
    <LineConfigProvider labelSpan={5}>
      <div className={styles.interactive}>
        <Line label={"触发组件"}>
          <ComponentNodesSelect all allName={"全部组件"} multiple style={{ width: "100%" }} />
        </Line>
        <Line label={"触发操作"}>
          <ICustomSelect
            style={{ width: "100%" }}
            requestFn={async () => {
              return [
                { label: "显隐", value: "1" },
                { label: "请求", value: "2" },
                { label: "自定义函数", value: "3" },
              ];
            }}
          />
        </Line>
      </div>
    </LineConfigProvider>
  );
}
