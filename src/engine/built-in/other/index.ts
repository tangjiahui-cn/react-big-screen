/**
 * 其他类型组件
 *
 * @author tangjiahui
 * @date 2025/4/25
 * */
import type { ComponentType } from "@/engine";
import React from "react";
import { peopleExposes } from "@/engine/built-in/other/PeopleTable";

export const other: ComponentType[] = [
  {
    cId: "peopleTable",
    cName: "人员表格",
    description: "演示使用的表格，可以筛选人员列表",
    category: "other",
    x: 0,
    y: 0,
    width: 600,
    height: 300,
    exposes: peopleExposes,
    component: React.lazy(() => import("./PeopleTable")),
  },
  {
    cId: "chinaMap",
    cName: "中国地图",
    description: "使用echarts实现的中国地图。",
    category: "other",
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    component: React.lazy(() => import("./ChinaMap")),
    attributesComponent: React.lazy(() => import("./ChinaMap/attributes")),
  },
  {
    cId: "scrollList",
    cName: "滚动列表",
    description: "支持自动滚动的列表组件。",
    category: "other",
    x: 0,
    y: 0,
    width: 300,
    height: 500,
    dataSourceType: "static",
    staticDataSource: [
      { key: "1", title: "测试演示项目", status: "1" },
      { key: "2", title: "私有化项目", status: "2" },
      { key: "3", title: "公有云项目", status: "2" },
      { key: "4", title: "培训项目一", status: "1" },
      { key: "5", title: "培训项目二", status: "2" },
      { key: "6", title: "tjh项目", status: "1" },
    ],
    component: React.lazy(() => import("./ScrollList")),
    attributesComponent: React.lazy(() => import("./ScrollList/attributes")),
  },
  {
    cId: "defaultImage",
    cName: "预置图片",
    description: "预置的一组图片。",
    category: "other",
    x: 0,
    y: 0,
    width: 150,
    height: 150,
    component: React.lazy(() => import("./DefaultImage")),
    attributesComponent: React.lazy(() => import("./DefaultImage/attributes")),
  },
  {
    cId: "ProgressList",
    cName: "进度条列表",
    description: "支持自动滚动的进度条列表。",
    category: "other",
    x: 0,
    y: 0,
    width: 300,
    height: 500,
    dataSourceType: "static",
    staticDataSource: [
      { key: "1", title: "测试演示项目", count: 999 },
      { key: "2", title: "私有化项目", count: 800 },
      { key: "3", title: "公有云项目", count: 600 },
      { key: "4", title: "培训项目一", count: 400 },
      { key: "5", title: "培训项目二", count: 200 },
      { key: "6", title: "tjh项目", count: 0 },
    ],
    component: React.lazy(() => import("./ProgressList")),
    attributesComponent: React.lazy(() => import("./ProgressList/attributes")),
  },
];
