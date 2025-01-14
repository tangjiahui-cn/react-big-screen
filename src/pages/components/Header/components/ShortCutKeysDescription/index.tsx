/**
 * ShortCutKeysDescription
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { Space } from "antd";
import React from "react";

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
    <Space direction={"vertical"} style={{ padding: 6 }}>
      <b>快捷键</b>
      <Space>
        <span>全选：</span>
        <Key>Shift</Key>
        <span>+</span>
        <Key>A</Key>
      </Space>
      <Space>
        <span>删除：</span>
        <Key>BackSpace</Key>
        <span> 或 </span>
        <Key>Delete</Key>
      </Space>
    </Space>
  );
}
