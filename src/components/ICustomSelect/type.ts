export type ValueType = string | number | undefined;
export type DataMapType = Record<string, IOption>;

export interface IOption {
  /** select option label */
  label?: string;
  /** unique id */
  value?: ValueType;
}

export const localSearchFn = (key: string, options?: any) =>
  (options?.children || "")?.toLowerCase?.().includes(key?.toLowerCase?.());
