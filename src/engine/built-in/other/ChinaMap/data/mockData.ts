export const planePath =
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

const cityData = [
  { name: "北京", coords: [116, 39], value: 83 },
  { name: "广东", coords: [115, 22], value: 22 },
  { name: "西藏", coords: [91, 29], value: 45 },
  { name: "云南", coords: [102, 25], value: 108 },
  { name: "广西", coords: [108, 22], value: 230 },
  { name: "新疆", coords: [87, 43], value: 67 },
];

export const cityValueMap = cityData.reduce((dataMap, x) => {
  dataMap[x.name] = x.value;
  return dataMap;
}, {} as any);

const startCoords = cityData[0].coords;

// 飞机线数据
export const lines = cityData.slice(1).map((x) => {
  return {
    coords: [startCoords, x.coords],
    tooltip: {
      formatter: () => {
        return `${x?.name}：${x?.value || 0}个`;
      },
    },
  };
});

// 涟漪标记点
export const pointers = cityData.map((x) => {
  return {
    name: x?.name,
    value: [...x.coords, x.value],
    tooltip: {
      formatter: () => {
        return `${x?.name}：${x?.value || 0}个`;
      },
    },
  };
});
