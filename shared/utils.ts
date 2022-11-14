export function getRegionNames(country: string) {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  } catch {
    return country;
  }
}

export function isEmptyOrSpaces(str?: string) {
  return !str || str === null || str.match(/^ *$/) !== null;
}
