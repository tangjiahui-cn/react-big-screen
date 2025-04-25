// 筛选项默认值
export interface TableData {
  name: string;
  age: string;
  sex: string;
  address: string;
}

export const INITIAL: TableData = {
  name: "",
  age: "",
  sex: "",
  address: "",
};

export const MOCK_LIST: TableData[] = [
  { name: "唐道友", age: "25", sex: "男", address: "浙江省杭州市" },
  { name: "赵道友", age: "12", sex: "男", address: "浙江省杭州市" },
  { name: "狐道友", age: "300", sex: "女", address: "浙江省杭州市" },
  { name: "牛道友", age: "190", sex: "男", address: "浙江省杭州市" },
  { name: "白道友", age: "10000", sex: "女", address: "浙江省杭州市" },
  { name: "韩道友", age: "342", sex: "男", address: "浙江省杭州市" },
  { name: "王道友", age: "33", sex: "男", address: "浙江省杭州市" },
  { name: "汪道友", age: "4442", sex: "女", address: "浙江省杭州市" },
  { name: "库道友", age: "992", sex: "男", address: "浙江省杭州市" },
  { name: "雷道友", age: "32332", sex: "男", address: "浙江省杭州市" },
  { name: "魔道友", age: "12", sex: "女", address: "浙江省杭州市" },
];

export function filterList(list: TableData[], filter: TableData): TableData[] {
  const nameLowerCase = filter?.name?.toLowerCase?.();
  const ageLowerCase = filter?.age?.toLowerCase?.();
  const sexLowerCase = filter?.sex?.toLowerCase?.();
  const addressLowerCase = filter?.address?.toLowerCase?.();
  return list.filter((data: TableData) => {
    let str: string | undefined = "";
    let isPass = true;
    if (isPass && nameLowerCase && (str = data?.name?.toLowerCase?.())) {
      isPass = str?.includes?.(nameLowerCase);
    }
    if (isPass && ageLowerCase && (str = data?.age?.toLowerCase?.())) {
      isPass = str?.includes?.(ageLowerCase);
    }
    if (isPass && sexLowerCase && (str = data?.sex?.toLowerCase?.())) {
      isPass = str?.includes?.(sexLowerCase);
    }
    if (isPass && addressLowerCase && (str = data?.address?.toLowerCase?.())) {
      isPass = str?.includes?.(addressLowerCase);
    }
    return isPass;
  });
}
