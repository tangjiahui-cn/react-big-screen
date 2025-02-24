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
import { useTranslation } from "react-i18next";

type MenuItem = MenuBarItem & {
  children?: React.ReactNode;
};

export default function Menu() {
  const [t, i18n] = useTranslation();
  const menuList: MenuItem[] = useMemo(() => {
    return [
      {
        key: "library",
        icon: <AppstoreOutlined />,
        title: t("menu.bar.library"),
        children: <Library />,
      },
      {
        key: "componentNodes",
        icon: <ApartmentOutlined />,
        title: t("menu.bar.componentNodes"),
        children: <ComponentNodes />,
      },
      {
        key: "property",
        icon: <BankOutlined />,
        title: t("menu.bar.property"),
        children: <Property />,
      },
      {
        key: "favorites",
        icon: <StarOutlined />,
        title: t("menu.bar.favorites"),
        children: <Favorites />,
      },
    ];
  }, [i18n.language]);

  const currentMenu = useConfig<GlobalConfig["currentMenu"]>((config) => config.currentMenu);
  const [activeKey, setActiveKey] = useState<string>("");

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
    setActiveKey(menu?.key || menuList[0].key);
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
