/**
 * Library
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import { ComponentType, useComponents } from "@/engine";
import { Input } from "antd";
import { useMemo, useState } from "react";
import { useUpdateEffect } from "ahooks";
import IEmpty from "@/components/IEmpty";
import styles from "./index.module.less";
import Item from "./components/Item";
import { debounce } from "lodash-es";

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
  const components = useComponents();
  const [keyword, setKeyword] = useState<string>("");
  const [displayComponents, setDisplayComponents] = useState<ComponentType[]>([]);

  const debounceFilterComponent = useMemo(() => {
    return debounce((componentList: ComponentType[], keyword: string = "") => {
      const result = filterComponents(componentList, keyword);
      setDisplayComponents(result);
    }, 500);
  }, []);

  useUpdateEffect(() => {
    setDisplayComponents(filterComponents(components, keyword));
  }, [components]);

  useUpdateEffect(() => {
    debounceFilterComponent(components, keyword);
  }, [keyword]);

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
        {!displayComponents.length && <IEmpty description={"暂无组件"} />}
        {displayComponents.map((component: ComponentType) => {
          return <Item key={component.cId} component={component} className={styles.library_item} />;
        })}
      </div>
    </div>
  );
}
