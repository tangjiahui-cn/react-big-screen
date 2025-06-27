declare module "*.vue";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.js";
declare module "*.json";
declare module "*.txt";

declare const BASE: string;
declare const PUBLIC_PATH: string;
declare const __DEV__: boolean;
declare const VERSION: string;

/************************ Types ************************/
// 找到 T 中与 U 不相交的属性
type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

// 取类型 T 或 U
type OR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/************************ RequireJs ************************/
type RequireJsReturnCallback = (...args: any[]) => any;
type RequireJsCallback = (...args: any[]) => void;
type RequireJsDefine = ((
  id: string,
  dependencies: string[],
  callback: RequireJsReturnCallback,
) => void) &
  ((dependencies: string[], callback: RequireJsReturnCallback) => void) &
  ((callback: RequireJsReturnCallback) => void);

type RequireJsRequire = (dependencies: string[], callback: RequireJsCallback) => void;

interface Window {
  define: RequireJsDefine;
  require: RequireJsRequire;
}

type Unmount = () => void;

// 提取数组类型
type GetObjectValueType<T> = T extends (infer U)[]
  ? U
  : T extends Records<string, infer V>
  ? V
  : never;
