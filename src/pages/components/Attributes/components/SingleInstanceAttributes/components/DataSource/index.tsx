/**
 * DataSource
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
import { Line, LineConfigProvider } from "@/components/Attributes";
import ICustomSelect from "@/components/ICustomSelect";
import styles from "./index.module.less";
import { useSingleSelectedInstance } from "../..";
import engine, { DataSourceType } from "@/engine";
import RequestDataSource from "./components/RequestDataSource";
import StaticDataSource from "./components/StaticDataSource";

const dataSourceTypeOptions: { label: string; value: DataSourceType }[] = [
  { label: "静态数据", value: "static" },
  { label: "请求接口", value: "request" },
];

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const dataSourceType = componentNode?.dataSourceType ?? "static";

  return (
    <LineConfigProvider labelSpan={5}>
      <div className={styles.dataSource}>
        <Line label={"数据源"}>
          <ICustomSelect
            value={dataSourceType}
            allowClear={false}
            style={{ width: "100%" }}
            requestFn={async () => dataSourceTypeOptions}
            onChange={(dataSourceType: any) => {
              engine.componentNode.update(componentNode?.id, {
                dataSourceType,
              });
            }}
          />
        </Line>
        {/* 静态数据 */}
        {dataSourceType === "static" && (
          <StaticDataSource style={{ flex: 1, overflow: "hidden" }} />
        )}
        {/* 请求数据 */}
        {dataSourceType === "request" && (
          <RequestDataSource style={{ flex: 1, overflow: "hidden" }} />
        )}
      </div>
    </LineConfigProvider>
  );
}
