/**
 * 公共模块
 *
 * @author tangjiahui
 * @date 2025/2/19
 */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import * as antd from "antd";

// 预定义公共模块（此处修改公共模块）
// tips: 注意此处会增大项目打包体积，因为是全量引入，之后尽量走全局CDN设置window.xxx。
export const COMMON_MODULE: Record<string, any | (() => any)> = {
  antd,
  react: React,
  "react-dom": ReactDOM,
  "react-dom/client": ReactDOMClient,
};

// 根据模块id获取公共模块
export function getCommonModule(id: string) {
  return COMMON_MODULE[id] || window[id as any];
}
