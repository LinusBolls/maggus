import camelCase from "camelcase";

import { toProps, toData } from "./core";
import {
  atLinebreaks,
  blankLines,
  foldedLines,
  getStatus,
  propsPattern,
  whitespace,
  validateVersion,
  toMaggusAdr,
  toMaggusName,
} from "../util";
import { Line, VcfError, VcfFormatError } from "../types";

const resolveValue = (name: string, value: string): any => {

  if (name === "n") return toMaggusName(value)
  if (name === "adr") return toMaggusAdr(value)

  return value
}

function prepareVCard(line: string): Line {
  const match = propsPattern.exec(line);

  if (!match)
    return {
      name: "",
      props: null,
      value: "",
      group: null,
      errors: [
        new VcfFormatError(
          `Misformatted vCard: failed to parse line "${line}"`,
          false
        ),
      ],
    };

  const [_, key = "", propsStr = "", value = ""] = match;

  const property = key.includes(".") ? (key.split(".")[1] as string) : key;
  const group = key.includes(".") ? (key.split(".")[0] as string) : null;

  const propsArr = propsStr ? propsStr.replace(/^;|;$/g, "").split(";") : [];

  const props = propsArr.reduce(toProps, {});

  const name = camelCase(property);

  return { name, props, value: resolveValue(name, value), group, errors: [] };
}

function parseVCard(value: any): any {
  
  // InvalidParseResult | ValidParseResult<T>
  let errs: VcfError[] = [];

  const lines = value
    .toString()
    .replace(whitespace, "")
    .replace(blankLines, "$1")
    .replace(foldedLines, "")
    .split(atLinebreaks);

  const begin = lines[0];
  const content = lines.slice(1, -1);
  const end = lines[lines.length - 1];

  const { data, lineErrors } = content.reduce(toData(prepareVCard), {
    data: {},
    lineErrors: [],
  });

  const version = data.version?.length ? data.version[0].value : null;

  const versionErrs = validateVersion(version);

  if (!/BEGIN:VCARD/i.test(begin))
    errs.push(
      new VcfFormatError(
        `Invalid vCard: expected "BEGIN:VCARD" but found "${begin}"`,
        true
      )
    );

  if (!/END:VCARD/i.test(end))
    errs.push(
      new VcfFormatError(
        `Invalid vCard: expected "END:VCARD" but found "${end}"`,
        true
      )
    );

  const errors = [...errs, ...versionErrs, ...lineErrors];
  const status = getStatus(errors);

  return {
    errors,
    data,
    meta: {
      format: "vcard",
      version,
      status,
    },
  };
}
export default parseVCard;
