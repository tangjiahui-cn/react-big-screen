import { getUrlText } from "@/utils/download";
import { message } from "antd";
import engine from "@/engine";

/**
 * 获取示例json文本
 *
 * @param jsonName 示例json名称
 */
export async function getExampleJsonText(jsonName: string): Promise<string> {
  const text = await getUrlText(`./example/${jsonName}.json`);
  return text.startsWith("<!DOCTYPE html>") ? "" : text;
}

/**
 * 读取实例json
 *
 * @param jsonName 示例json名称
 */
export async function loadExampleJson(jsonName: string) {
  const jsonText = await getExampleJsonText(jsonName);
  if (!jsonText) return message.error("读取失败");
  // 读取json
  engine.loadJSONString(jsonText);
}
