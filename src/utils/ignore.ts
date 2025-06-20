const ignoreDomainNameList: string[] = ["rbs-screen.top"];

export function isIgnoreDomainName(name: string = window.location.host) {
  const nameLower = name?.toLowerCase();
  return ignoreDomainNameList.some((domainName) => {
    return nameLower?.includes?.(domainName?.toLowerCase?.());
  });
}
