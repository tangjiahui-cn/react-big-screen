/**
 * 单实例属性配置
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { Empty, Tabs } from "antd";
import Attributes from "./components/Attributes";
import engine, { ComponentNodeType, InstanceType } from "@/engine";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [componentNode, setComponentNode] = useState<ComponentNodeType>();

  useEffect(() => {
    // 设置componentNode
    setComponentNode(engine.componentNode.get(instance.id));
    // 监听数据节点变化
    return engine.componentNode.onChange(instance.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, [instance.id]);

  return componentNode ? (
    <SingleSelectedContext.Provider value={{ instance, componentNode }}>
      <Tabs
        style={{ padding: "0 16px" }}
        size={"small"}
        items={[
          { key: "1", label: "属性", children: <Attributes /> },
          {
            key: "2",
            label: "数据",
            children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂未开发"} />,
          },
          {
            key: "3",
            label: "交互",
            children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂未开发"} />,
          },
        ]}
      />
    </SingleSelectedContext.Provider>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无数据"} />
  );
}
