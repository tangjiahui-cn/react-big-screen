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
];
