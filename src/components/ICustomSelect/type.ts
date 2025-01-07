export interface IOption {
  /** select option label */
  label?: string;
  /** unique id */
  value?: string;
}

export const localSearchFn = (key: string, options?: any) =>
  (options?.children || "").toLowerCase().includes(key.toLowerCase());
