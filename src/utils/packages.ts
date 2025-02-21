/**
 * packages
 *
 * @author tangjiahui
 * @date 2025/2/18
 * @description 远程资产包相关处理函数。
 */
import { getUrlText } from ".";
import { getCommonModule } from "@/common-module";
import type { ComponentPackage } from "@/engine";

// 判断文本是否是umd包
export async function isUMDModuleText(text: string): Promise<boolean> {
  return !!(await loadUMDModuleFromText(text));
}

// 判断文本是否是amd包
export async function isAMDModuleText(text: string): Promise<boolean> {
  return !!(await loadAMDModuleFromText(text));
}

// 从文本中加载一个模块
export async function loadModuleFromText(text: string): Promise<ComponentPackage | undefined> {
  if (!text) return undefined;
  return (await loadUMDModuleFromText(text)) || (await loadAMDModuleFromText(text));
}

// 从文本数组中加载多个模块
export async function loadModulesFromTexts(
  textArr: string[],
): Promise<(ComponentPackage | undefined)[]> {
  return Promise.all(textArr.map((text) => loadModuleFromText(text)));
}

// 从文本中加载umd包
export async function loadUMDModuleFromText<T = any>(text: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    try {
      if (!text) return undefined;
      const module = { exports: {} };
      const require = (id: string) => getCommonModule(id);
      const fn = new Function("module", "exports", "require", text);
      try {
        fn(module, module.exports, require);
        const keys = Object.keys(module.exports);
        return resolve(keys.length ? (module.exports as T) : undefined);
      } catch (e) {
        console.warn(e);
        return resolve(undefined);
      }
    } catch (e) {
      console.warn(e);
      resolve(undefined);
    }
  });
}

// 从远程地址加载一个umd包
export async function loadUMDModuleFromUrl<T = any>(url: string): Promise<T | undefined> {
  if (!url) return undefined;
  const text = await getUrlText(url);
  return await loadUMDModuleFromText(text);
}

// 从文本加载一个amd包
export async function loadAMDModuleFromText<T = any>(text: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    try {
      if (!text) return undefined;
      let module: any;

      // 定义define函数获取module
      const define = function () {
        let ids: string[] | undefined;
        let factory: Function | undefined;

        if (arguments.length === 1) {
          ids = [];
          factory = arguments[0];
        } else if (arguments.length === 2) {
          [ids, factory] = arguments;
        } else if (arguments.length === 3) {
          ids = arguments[1];
          factory = arguments[2];
        }

        const deps = ids?.map?.((id: string) => getCommonModule(id)) || [];
        module = factory?.(...deps);
      };

      const fn = new Function("define", text);

      try {
        fn(define);
        return resolve(module ?? undefined);
      } catch (e) {
        console.warn(e);
        return resolve(undefined);
      }
    } catch (e) {
      console.warn(e);
      return resolve(undefined);
    }
  });
}

// 从远程地址加载一个amd包
export async function loadAMDModuleFromUrl<T = any>(url: string): Promise<T | undefined> {
  if (!url) return undefined;
  const text = await getUrlText(url);
  return await loadAMDModuleFromText(text);
}
