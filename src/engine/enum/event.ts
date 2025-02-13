import { ComponentNodeEventTargetOpt } from "..";

export const INIT_EXPOSES: {
  label: string;
  value: ComponentNodeEventTargetOpt["exposeId"];
}[] = [
  { label: "显隐", value: "visible" },
  { label: "请求", value: "request" },
  { label: "自定义函数", value: "custom" },
];

export const INIT_EXPOSE_MAP: Record<ComponentNodeEventTargetOpt["exposeId"], string> = {
  visible: "显隐",
  request: "请求",
  custom: "自定义函数",
};
