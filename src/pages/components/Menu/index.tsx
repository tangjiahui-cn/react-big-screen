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
import Property from "./components/Property";
import Favorites from "./components/Favorites";
import React, { useEffect, useMemo, useState } from "react";
import { ApartmentOutlined, AppstoreOutlined, BankOutlined, StarOutlined } from "@ant-design/icons";
import engine, { GlobalConfig, useConfig } from "@/engine";

type MenuItem = MenuBarItem & {
  children?: React.ReactNode;
};

const menuList: MenuItem[] = [
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
  {
    key: "property",
    icon: <BankOutlined />,
    title: "个人资产",
    children: <Property />,
  },
  {
    key: "favorites",
    icon: <StarOutlined />,
    title: "收藏夹",
    children: <Favorites />,
  },
];

const FIRST_PANEL_KEY = menuList[0].key; // 默认 0
export default function Menu() {
  const currentMenu = useConfig<GlobalConfig["currentMenu"]>((config) => config.currentMenu);
  const [activeKey, setActiveKey] = useState<string>(FIRST_PANEL_KEY);

  // menu渲染children
  const children: React.ReactNode = useMemo(() => {
    return menuList.find((item) => item.key === activeKey)?.children;
  }, [activeKey]);

  function handeChange(key: string) {
    setActiveKey(key);
    engine.config.setConfigSilently({
      currentMenu: key,
    });
  }

  useEffect(() => {
    const { currentMenu } = engine.config.getConfig();
    const menu = menuList.find((item) => item.key === currentMenu);
    setActiveKey(menu?.key || FIRST_PANEL_KEY);
  }, [currentMenu]);

  return (
    <div className={styles.menu}>
      <div className={styles.menu_bar}>
        <MenuBar value={activeKey} list={menuList} onChange={handeChange} />
      </div>
      <div className={styles.menu_main}>{children}</div>
    </div>
  );
}
