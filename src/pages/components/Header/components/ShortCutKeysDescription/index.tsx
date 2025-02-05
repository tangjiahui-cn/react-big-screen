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
  return (
    <Space
      direction={"vertical"}
      style={{ padding: 6, userSelect: "none", whiteSpace: "nowrap", width: 300 }}
    >
      <b>快捷键</b>

      <Space>
        <span>全选：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>A</Key>
      </Space>

      <Space>
        <span>反选：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>R</Key>
      </Space>

      <Space>
        <span>复制：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>C</Key>
      </Space>

      <Space>
        <span>保存：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>S</Key>
      </Space>

      <Space>
        <span>多选：</span>
        <span>按住</span>
        <Key>Shift</Key>
        <span>选中</span>
      </Space>

      <Space>
        <span>删除：</span>
        <Key>BackSpace</Key>
        <span> 或 </span>
        <Key>Delete</Key>
      </Space>

      <Space>
        <span>位移：</span>
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
        <span>强制：</span>
        <span>按住</span>
        <Key>Shift</Key>
        <span>框选锁定组件</span>
      </Space>
    </Space>
  );
}
