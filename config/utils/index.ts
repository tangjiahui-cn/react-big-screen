import pkg from "../../package.json";

export function getPkgDependenciesNames(): string[] {
  return Object.keys(pkg.dependencies);
}

const dependenciesNames = getPkgDependenciesNames();
const dependenciesNamesRegs = dependenciesNames.map((name) => new RegExp(`^${name}`));

/**
 * external 所有的 dependencies
 * @param id
 */
export function externalDependencies(id: string): boolean {
  return dependenciesNamesRegs.some((reg) => reg.test(id));
}
