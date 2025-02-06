/**
 * base （基础组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import Text from "./Text";
import TextAttributes from "./Text/attributes";
import Title from "./Title";
import Image from "./Image";
import Button from "./Button";
import Background from "./Background";

export const base: ComponentType[] = [
  {
    cId: "text",
    cName: "文字",
    icon: () => import("@/static/built-in/text.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 32,
    options: {
      value: "一段文字",
      fontSize: 14,
      lineHeight: 32,
    },
    component: Text,
    attributesComponent: TextAttributes,
  },
  {
    cId: "title",
    cName: "标题",
    icon: () => import("@/static/built-in/title.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 48,
    options: {
      value: "标题",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: "48px",
    },
    component: Title,
  },
  {
    cId: "button",
    cName: "按钮",
    icon: () => import("@/static/built-in/button.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 64,
    height: 32,
    options: {
      type: "primary",
      children: "按钮",
    },
    component: Button,
  },
  {
    cId: "background",
    cName: "背景",
    icon: () => import("@/static/built-in/background.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    options: {
      background: "#223447",
    },
    component: Background,
  },
  {
    cId: "image",
    cName: "图片",
    icon: () => import("@/static/built-in/image.png"),
    category: "base",
    x: 0,
    y: 0,
    width: 270,
    height: 150,
    options: {
      src: "https://ts3.cn.mm.bing.net/th?id=OIP-C.3r1vguZyWFUJ80A2Nf2k3AHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    component: Image,
  },
];
