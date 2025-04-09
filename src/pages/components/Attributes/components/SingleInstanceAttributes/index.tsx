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
import Json from "./components/Json";
import engine, { ComponentNodeType, InstanceType } from "@/engine";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.less";
import { useListenRef } from "@/hooks";

const SingleSelectedContext = createContext<{
  instance?: InstanceType;
  componentNode?: ComponentNodeType;
}>({});

export const useSingleSelectedInstance = () => useContext(SingleSelectedContext);

interface Props {
  instance: InstanceType;
}

export default function SingleInstanceAttributes(props: Props) {
  const [t, i18n] = useTranslation();
  const { instance } = props;
  const [scopeComponentNode, setScopeComponentNode] = useState<ComponentNodeType>();
  const instanceRef = useListenRef(instance);

  useEffect(() => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) setScopeComponentNode(componentNode);
    return engine.componentNode.onChange(instance.id, ({ payload }) => {
      setScopeComponentNode({ ...payload });
    });
  }, [instance.id]);

  useEffect(() => {
    return engine.onJsonChange(() => {
      // 监听json变化时设置 componentNode (适用于历史记录变更时设置json)
      setScopeComponentNode(engine.componentNode.get(instanceRef?.current?.id));
    });
  }, []);

  return useMemo(() => {
    return scopeComponentNode ? (
      <SingleSelectedContext.Provider value={{ instance, componentNode: scopeComponentNode }}>
        <Tabs
          className={styles.singleAttributes}
          defaultActiveKey={"1"}
          size={"small"}
          items={[
            { key: "1", label: t("attributes.attr.title"), children: <Attributes /> },
            {
              key: "2",
              label: t("attributes.dataSource.title"),
              children: <DataSource />,
            },
            {
              key: "3",
              label: t("attributes.interactive.title"),
              children: <Interactive />,
            },
            {
              key: "4",
              label: "json",
              children: <Json />,
            },
          ]}
        />
      </SingleSelectedContext.Provider>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无数据"} />
    );
  }, [instance, scopeComponentNode, i18n.language]);
}
