/**
 * 懒加载图片
 */

const assets = import.meta.glob("./assets/*.{png,jpg,jpeg}");

export async function getLazyImage(name?: string) {
  if (!name) return undefined;
  return assets[`./assets/${name}`]().then((module: any) => {
    return module?.default || undefined;
  });
}
