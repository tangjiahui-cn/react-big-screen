/**
 * 公共模块
 *
 * @author tangjiahui
 * @date 2025/2/19
 */
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";

// 预定义公共模块（此处修改公共模块）
export const COMMON_MODULE: Record<string, any> = {
  react: React,
  "react-dom": ReactDOM,
  "react-dom/client": ReactDOMClient,
};

// 根据模块id获取公共模块
export function getCommonModule(id: string) {
  return COMMON_MODULE[id] || window[id as any];
}
