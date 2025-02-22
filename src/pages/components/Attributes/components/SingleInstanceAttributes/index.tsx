/**
 * 单实例属性配置
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { Empty, Tabs } from "antd";
import Attributes from "./components/Attributes";
import DataSource from "./components/DataSource";
import Interactive from "./components/Interactive";
import { ComponentNodeType, InstanceType, useComponentNode } from "@/engine";
import { createContext, useContext } from "react";

const SingleSelectedContext = createContext<{
  instance?: InstanceType;
  componentNode?: ComponentNodeType;
}>({});

export const useSingleSelectedInstance = () => useContext(SingleSelectedContext);

interface Props {
  instance: InstanceType;
}

export default function SingleInstanceAttributes(props: Props) {
  const { instance } = props;
  const componentNode = useComponentNode(instance.id);
  return componentNode ? (
    <SingleSelectedContext.Provider value={{ instance, componentNode }}>
      <Tabs
        defaultActiveKey={"1"}
        style={{ padding: "0 16px" }}
        size={"small"}
        items={[
          { key: "1", label: "属性", children: <Attributes /> },
          {
            key: "2",
            label: "数据",
            children: <DataSource />,
          },
          {
            key: "3",
            label: "交互",
            children: <Interactive />,
          },
        ]}
      />
    </SingleSelectedContext.Provider>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无数据"} />
  );
}
