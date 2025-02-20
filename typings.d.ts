declare module "*.vue";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.js";
declare module "*.json";

declare const BASE: string;
declare const PUBLIC_PATH: string;
declare const __DEV__: boolean;
declare const VERSION: string;

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
