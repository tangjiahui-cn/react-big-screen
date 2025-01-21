/**
 * base （基础组件）
 *
 * @author tangjiahui
 * @date 2025/1/21
 * */
import type { ComponentType } from "@/engine";
import ICON_TEXT from "@/static/built-in/text.png";
import ICON_TITLE from "@/static/built-in/title.png";
import ICON_IMAGE from "@/static/built-in/image.png";
import ICON_BUTTON from "@/static/built-in/button.png";
import ICON_BACKGROUND from "@/static/built-in/background.png";
import Text from "./Text";
import Title from "./Title";
import Image from "./Image";
import Button from "./Button";
import Background from "./Background";

export const base: ComponentType[] = [
  {
    cId: "text",
    cName: "文字",
    icon: ICON_TEXT,
    group: "base",
    x: 0,
    y: 0,
    width: 120,
    height: 32,
    options: {
      value: "一段文字",
      fontSize: 14,
      lineHeight: "32px",
    },
    component: Text,
  },
  {
    cId: "title",
    cName: "标题",
    icon: ICON_TITLE,
    group: "base",
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
    icon: ICON_BUTTON,
    group: "base",
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
    icon: ICON_BACKGROUND,
    group: "base",
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
    icon: ICON_IMAGE,
    group: "base",
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
