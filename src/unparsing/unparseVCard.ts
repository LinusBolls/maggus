import foldline from "foldline";

import { capitalDashCase, seperateSameValues } from "../util";

import { VcfVersion } from "../types";

const toProp =
  (lineName: string, version: string) =>
  ([propName, propValue]: [any, any]) => {
    if (version === "2.1") {
      if (["TEL", "ADR", "EMAIL"].includes(lineName))
        return capitalDashCase(propValue.join(";"));

      return (
        capitalDashCase(propName) + "=" + capitalDashCase(propValue.join(";"))
      );
    }

    if (version === "3.0")
      return (
        capitalDashCase(propName) + "=" + capitalDashCase(propValue.join(","))
      );

    if (version === "4.0")
      return capitalDashCase(propName) + "=" + propValue.join(",");

    throw "among us!";
  };

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

    const foldedValue = version === "2.1" ? value : foldline(value, 75, false);

    const newValue = lineName === "VERSION" ? version : foldedValue;

    return groupStr + lineName + joinedProps + ":" + newValue;
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
