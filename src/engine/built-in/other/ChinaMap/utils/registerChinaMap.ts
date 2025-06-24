/**
 * 注册中国地图
 */
// 中国地图名称
export const MAP_CHINA = "chinaOutline";

/**
 * 获取中国地图json
 */
export async function fetchChinaMapGeoJSON(): Promise<any[]> {
  let json: any;
  try {
    // 通过远程获取json文件
    json = await fetch("https://file.geojson.cn/china/1.6.2/china.json").then((res) => res.json());
  } catch {
    // 失败则取本地
    json = (await import("../json/china.json"))?.default;
  }
  // 设置南海十段线
  if (json?.features?.length) {
    const CHINA_TEN = await import("../json/china-ten.json");
    json.features.push(CHINA_TEN?.default);
  }
  return json;
}

/**
 * echarts 注册中国地图
 */
export async function registerChinaMap(): Promise<void> {
  if (!window.echarts) {
    console.error("echarts not found.");
    return;
  }
  if (window.echarts.getMap(MAP_CHINA)) {
    return;
  }
  const geoJSON: any = await fetchChinaMapGeoJSON();
  window.echarts.registerMap(MAP_CHINA, geoJSON);
}
