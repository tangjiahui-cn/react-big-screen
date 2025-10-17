import { ComponentNodeType } from "..";
import { RbsEngine } from "@/export";

/**
 * 获取引用了package中组件的全部实例
 *
 * @param packageId package的id
 * @return componentNodes
 */
export function getPackageComponentNodes(packageId: string): ComponentNodeType[] {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return [];
  const components = engine.component.getPackage(packageId)?.components;
  return engine.componentNode.getAll().filter((componentNode) => {
    return components?.find?.((component) => {
      return component.cId === componentNode.cId;
    });
  });
}
