/**
 * ShortCutKeysDescription
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { Space } from "antd";
import React from "react";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function Key({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid white",
        padding: "0 8px",
        height: 25,
        fontSize: 12,
        borderRadius: 2,
        minWidth: 25,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

export default function ShortCutKeysDescription() {
  const [t] = useTranslation();
  return (
    <Space
      direction={"vertical"}
      style={{ padding: 6, userSelect: "none", whiteSpace: "nowrap", width: 300 }}
    >
      <b>{t("head.shortCutKeys.title")}</b>

      <Space>
        <span>{t("head.shortCutKeys.all")}：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>A</Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.invert")}：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>R</Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.copy")}：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>C</Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.save")}：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>S</Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.multiple")}：</span>
        <span>{t("head.shortCutKeys.multipleExt.ext1")}</span>
        <Key>Shift</Key>
        <span>{t("head.shortCutKeys.multipleExt.ext2")}</span>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.delete")}：</span>
        <Key>BackSpace</Key>
        <span> {t("head.shortCutKeys.deleteExt.ext1")} </span>
        <Key>Delete</Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.move")}：</span>
        <Key>
          <ArrowUpOutlined />
        </Key>
        <Key>
          <ArrowRightOutlined />
        </Key>
        <Key>
          <ArrowDownOutlined />
        </Key>
        <Key>
          <ArrowLeftOutlined />
        </Key>
      </Space>

      <Space>
        <span>{t("head.shortCutKeys.force")}：</span>
        <span>{t("head.shortCutKeys.forceExt.ext1")}</span>
        <Key>Shift</Key>
        <span>{t("head.shortCutKeys.forceExt.ext2")}</span>
      </Space>
    </Space>
  );
}
