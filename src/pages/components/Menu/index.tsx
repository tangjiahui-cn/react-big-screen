/**
 * 左侧菜单
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import styles from "./index.module.less";
import Library from "./components/Library";
import ComponentNodes from "./components/ComponentNodes";
import MenuBar, { MenuBarItem } from "./components/MenuBar";
import React, { useMemo, useState } from "react";
import { ApartmentOutlined, AppstoreOutlined } from "@ant-design/icons";

type PanelItem = MenuBarItem & {
  children?: React.ReactNode;
};

const panelList: PanelItem[] = [
  {
    key: "library",
    icon: <AppstoreOutlined />,
    title: "组件库",
    children: <Library />,
  },
  {
    key: "componentNodes",
    icon: <ApartmentOutlined />,
    title: "页面组件",
    children: <ComponentNodes />,
  },
];

export default function Menu() {
  const [activeKey, setActiveKey] = useState<string>("componentNodes");

  const children: React.ReactNode = useMemo(() => {
    return panelList.find((item) => item.key === activeKey)?.children;
  }, [activeKey]);

  return (
    <div className={styles.menu}>
      <div className={styles.menu_bar}>
        <MenuBar value={activeKey} list={panelList} onChange={setActiveKey} />
      </div>
      <div className={styles.menu_main}>{children}</div>
    </div>
  );
}
