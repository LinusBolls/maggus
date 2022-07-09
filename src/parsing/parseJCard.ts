import { toData } from "./core";
import { getStatus, validateVersion } from "../util";
import { Line, ParseResult, VcfFormatError } from "../types";

function prepareJCard(line: any[]): Line {
  const [name, props, type, value] = line;

  return {
    name,
    props: { ...props, value: type },
    value: Array.isArray(value) ? value.join(",") : value,
    group: null,
    errors: [],
  };
}

function parseJCard(value: string | Buffer | any): ParseResult {
  const [begin, content] = value;

  let errs: ParseResult["errors"] = [];

  const { data, lineErrors } = content.reduce(toData(prepareJCard), {
    data: {},
    lineErrors: [],
  });

  const version = data["version"][0].value;

  const versionErrs = validateVersion(version);

  if (!/vcard/i.test(begin))
    errs.push(
      new VcfFormatError(
        `Invalid jCard: expected "VCARD" but found "${begin}"`,
        true
      )
    );

  const errors = [...errs, ...versionErrs, ...lineErrors];
  const status = getStatus(errors);

  return {
    errors,
    data,
    meta: {
      format: "jcard",
      version,
      status,
    },
  };
}
export default parseJCard;
