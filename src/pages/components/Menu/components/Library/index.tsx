/**
 * Library
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import { ComponentCategory, ComponentType, useComponents } from "@/engine";
import { Collapse, Input } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useUpdateEffect } from "ahooks";
import styles from "./index.module.less";
import ComponentsBlock from "./components/ComponentsBlock";
import { debounce, groupBy } from "lodash-es";
import IEmpty from "@/components/IEmpty";

const groupNameMap: Record<ComponentCategory, string> = {
  base: "基础组件",
  charts: "图表组件",
  layout: "布局组件",
  unknown: "未知组件",
};

function filterComponents(componentList: ComponentType[], keyword: string = ""): ComponentType[] {
  if (!keyword) return componentList;
  const keywordLowerCase = keyword.toLowerCase();
  return componentList.filter((component: ComponentType) => {
    return (
      component.cName.toLowerCase().includes(keywordLowerCase) ||
      component.cId.toLowerCase().includes(keywordLowerCase)
    );
  });
}

export default function Library() {
  const [activeKeys, setActiveKeys] = useState<any[]>([]);
  const components = useComponents();
  const [keyword, setKeyword] = useState<string>("");
  const [displayComponents, setDisplayComponents] = useState<ComponentType[]>([]);

  const debounceFilterComponent = useMemo(() => {
    return debounce((componentList: ComponentType[], keyword: string = "") => {
      const result = filterComponents(componentList, keyword);
      setDisplayComponents(result);
    }, 500);
  }, []);

  useEffect(() => {
    setDisplayComponents(filterComponents(components, keyword));
  }, [components]);

  useUpdateEffect(() => {
    debounceFilterComponent(components, keyword);
  }, [keyword]);

  // displayComponents 根据group属性分组
  const groups = useMemo(() => {
    const groupKeys: ComponentCategory[] = [];
    const groups = Object.entries(
      groupBy(displayComponents, (item) => item.category || "base"),
    ).map(([key, components]) => {
      groupKeys.push(key as ComponentCategory);
      return {
        key,
        components,
        label: groupNameMap[key as ComponentCategory],
      };
    });
    setActiveKeys(groupKeys);
    return groups;
  }, [displayComponents]);

  return (
    <div className={styles.library}>
      <div className={styles.library_header}>
        <Input.Search
          allowClear
          value={keyword}
          placeholder='搜索组件'
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>
      <div className={styles.library_main}>
        {groups.length ? (
          <Collapse
            expandIconPosition={"end"}
            activeKey={activeKeys}
            style={{ padding: 0 }}
            onChange={(keys) => setActiveKeys((keys as any) || [])}
          >
            {groups.map((group) => {
              return (
                <Collapse.Panel key={group.key} header={group.label} style={{ padding: 0 }}>
                  <ComponentsBlock components={group.components} />
                </Collapse.Panel>
              );
            })}
          </Collapse>
        ) : (
          <IEmpty style={{ height: "100%", background: "white" }} />
        )}
      </div>
    </div>
  );
}
