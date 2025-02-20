/**
 * 显示所有的packages列表
 *
 * @author tangjiahui
 * @date 2025/2/20
 */
import { useState } from "react";
import engine, { ComponentPackage } from "@/engine";
import { useEffectOnce } from "@/hooks";

export function usePackages() {
  const [packages, setPackages] = useState<ComponentPackage[]>([]);

  useEffectOnce(() => {
    setPackages(engine.component.getAllPackage());
    return engine.component.onPackageChange((pkgList) => {
      setPackages(pkgList);
    });
  });

  return packages;
}
