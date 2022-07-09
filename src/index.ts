import {
  getFormat,
  getMimeType,
  toDataUrl,
  toVcfOptionsError,
  tryToJson,
} from "./util";

import {
  ParseOptionsZod,
  ParseOptions,
  VcfFormat,
  VcfVersion,
  ParseValue,
  InvalidParseResult,
  ValidParseResult,
  Maggus,
  JCardProp,
} from "./types";

import parseVCard from "./parsing/parseVCard";
import parseJCard from "./parsing/parseJCard";
import parseMaggus from "./parsing/parseMaggus";

import unparseVCard from "./unparsing/unparseVCard";
import unparseJCard from "./unparsing/unparseJCard";
import unparseMaggus from "./unparsing/unparseMaggus";

/**
 * @param param expected to match "PROPERTY[=VALUE]", with =VALUE being optional
 * @desc if VALUE exists, PROPERTY: VALUE are added as a key-value-pair to the reducer,
 * else "type": PROPERTY is added as a key-value-pair to the reducer
 *
 * @example toProps({}, "VALUE=URL") => { value: "url" }
 * @example toProps({}, "WORK") => { type: "work" }
 *
 * @kind to be used as an argument to Array.prototype.reduce()
 */

/**
 * @line vCard 2.1 format: PROPERTY[;KEY[=VALUE]]:Attribute[;Attribute]
 * vCard 3.0 format: PROPERTY[;KEY[=VALUE]]:Attribute[;Attribute]
 * vCard 4.0 format: PROPERTY[;KEY[=value]]:Attribute[;Attribute]
 *
 * @kind to be used as an argument to Array.prototype.reduce()
 */

function toMaggus<T extends ParseValue>(
  value: T,
  format: VcfFormat
): InvalidParseResult | ValidParseResult<T, "maggus", VcfVersion> {
  if (format === "maggus") return parseMaggus(value as any);
  if (format === "vcard") return parseVCard(value);
  if (format === "jcard") return parseJCard(value);

  throw new Error(`toMaggus() received invalid format "${format}"`);
}
function toFormatted(maggus: Maggus, format: VcfFormat, version: VcfVersion) {
  if (format === "maggus") return unparseMaggus(maggus, version);
  if (format === "vcard") return unparseVCard(maggus, version);
  if (format === "jcard") return unparseJCard(maggus, version);

  throw new Error(`toFormatted() received invalid format "${format}"`);
}

const sache: Maggus<"4.0"> = {
  version: [{ value: "7.0", props: {}, group: null }],
  fn: [{ value: "3.0", props: {}, group: null }],
};

parse("moin", { toFormat: "maggus", toVersion: "4.0" }).data?.fn[0];
parse("moin", { toFormat: "maggus", toVersion: "2.1" }).data?.n[0];
parse("moin", { toFormat: "vcard" }).data;
parse(
  {
    version: [{ value: "4.0", props: {}, group: null }],

    n: [{ value: "hi", props: {}, group: null }],
  },
  { toFormat: "vcard", toVersion: "3.0" }
);
parse("moin", { toFormat: "jcard" }).data?.length;

const lol = parse(["vcard", [["version", {}, "text", "3.0"]]], {
  toFormat: "maggus",
  toVersion: "2.1",
});

if (lol.data != null && lol.data.tel?.length) console.log(lol.data.tel[0]);

function parse<T extends ParseValue, F extends VcfFormat, V extends VcfVersion>(
  value: T,
  options?: {
    toFormat?: F;
    toVersion?: V;
  }
): InvalidParseResult | ValidParseResult<T, F, V> {
  /* handling options parameter */

  const parsedOptions = ParseOptionsZod.safeParse(options);

  if (parsedOptions.success === false) {
    return {
      errors: parsedOptions.error.issues.map(toVcfOptionsError),
      data: null,
      meta: {
        format: null,
        version: null,
        status: "invalid",
      },
    } as InvalidParseResult;
  }
  const { toFormat, toVersion, urlEncode } = parsedOptions.data as ParseOptions;

  /* formatting */

  const jsonOrStr = tryToJson(value);

  const maggus = toMaggus(jsonOrStr, getFormat(jsonOrStr));

  if (maggus.data == null) return maggus;

  const result = toFormatted(maggus.data, toFormat, toVersion);

  const data = urlEncode ? toDataUrl(result, getMimeType(toFormat)) : result;

  return {
    errors: [],
    data,
    meta: maggus.meta,
  } as ValidParseResult<T, F, V>;
}

// function parseMultiple(
//   value: string,
//   options: ParseOptions | {} = {}
// ): ParseResult<ParseValue>[] {
//   const vcards = value.match(vcardPattern);

//   return vcards.map((i: string) => parse(i, options));
// }
// export default { parse, parseMultiple };
