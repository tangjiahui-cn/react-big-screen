/**
 * 人员表格
 *
 * @author tangjiahui
 * @date 2025/4/25
 */
import { createComponent, EventData } from "@/engine";
import { Table } from "antd";
import { useRequest } from "ahooks";
import { ColumnsType } from "antd/es/table";
import { mockQuery } from "./utils";
import { INITIAL, TableData, MOCK_LIST, filterList } from "./utils/mockData";
import { useStateWithRef } from "@/hooks";

type ExposeKeys = "refresh" | "changeFilter" | "setFilter" | "clearFilter";

export const peopleExposes: EventData<ExposeKeys>[] = [
  { label: "刷新", value: "refresh" },
  { label: "修改筛选项", value: "changeFilter" },
  { label: "设置筛选项", value: "setFilter" },
  { label: "清空筛选项", value: "clearFilter" },
];

export default createComponent<any, any, ExposeKeys>((props) => {
  const { width, height, useExpose } = props;
  const [filter, setFilter, filterRef] = useStateWithRef<TableData>(INITIAL);

  // 模拟请求
  const {
    data: dataSource = [],
    loading,
    refresh,
  } = useRequest(
    async () => {
      const list = (await mockQuery(MOCK_LIST)) as any[];
      return filterList(list, filter);
    },
    {
      refreshDeps: [filter],
    },
  );

  const columns: ColumnsType<any> = [
    { dataIndex: "name", title: "姓名" },
    { dataIndex: "age", title: "年龄" },
    { dataIndex: "sex", title: "性别" },
    { dataIndex: "address", title: "籍贯" },
  ];

  // 暴露事件
  useExpose({
    refresh: () => {
      refresh();
    },
    changeFilter: (params: Record<string, any>) => {
      setFilter({
        ...filterRef.current,
        ...(params as any),
      });
    },
    setFilter: (params: Record<string, any>) => {
      setFilter(params as any);
    },
    clearFilter: () => {
      setFilter({ ...INITIAL });
    },
  });

  return (
    <Table
      columns={columns}
      style={{ width, height, overflow: "hidden" }}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  );
});
