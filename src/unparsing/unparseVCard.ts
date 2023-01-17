import foldline from "foldline";

import { capitalDashCase, seperateSameValues, toVcfAddressSemicolonStr, toVcfNameSemicolonStr } from "../util";

import { VcfVersion } from "../types";

const tryJoin = (arr: string | string[], joinStr: string) => Array.isArray(arr) ? arr.join(joinStr) : arr

const toProp =
  (lineName: string, version: string) =>
  ([propName, propValue]: [any, any]) => {
    if (version === "2.1") {
      if (["TEL", "ADR", "EMAIL"].includes(lineName))
        return capitalDashCase(tryJoin(propValue, ";"));

      return (
        capitalDashCase(propName) + "=" + capitalDashCase(tryJoin(propValue, ";"))
      );
    }

    if (version === "3.0")
      return (
        capitalDashCase(propName) + "=" + capitalDashCase(tryJoin(propValue, ","))
      );

    if (version === "4.0")
      return capitalDashCase(propName) + "=" + tryJoin(propValue, ",");

    throw "among us!";
  };

const resolveValue = (name: string, value: any, version: VcfVersion) => {
  if (name === "VERSION") return version
  if (name === "ADR") return toVcfAddressSemicolonStr(value)
  if (name === "N") return toVcfNameSemicolonStr(value)
  if (version === "2.1") return value

  return foldline(value, 75, false)
}

const toLine =
  (version: string) =>
  ([name, i]: [any, any]) => {
    const { value, props, group } = i;

    const lineName = capitalDashCase(name);

    const propStr = Object.entries(props)
      .map(toProp(lineName, version))
      .join(";");

    const joinedProps = propStr ? ";" + propStr : "";
    const groupStr = group ? group + "." : "";

    // const foldedValue = version === "2.1" || lineName === "ADR" ? value : foldline(value, 75, false);

    // const newValue = lineName === "VERSION" ? version : foldedValue;

    return groupStr + lineName + joinedProps + ":" + resolveValue(lineName, value, version as VcfVersion);
  };

function unparseVCard(maggus: any, version: VcfVersion): string {
  const begin = "BEGIN:VCARD";

  const content = Object.entries(maggus)
    .reduce(seperateSameValues, [])
    .map(toLine(version));

  const end = "END:VCARD";

  const result = [begin, ...content, end].join("\n");

  return result;
}
export default unparseVCard;
