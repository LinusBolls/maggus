import { toData } from "./core";
import { getStatus, toMaggusAdr, toMaggusName, validateVersion } from "../util";
import { Line, ParseResult, VcfAddress, VcfFormatError } from "../types";

const resolveValue = (name: string, value: string | string[]) => {

  if (name === "n") return toMaggusName(value)
  if (name === "adr") return toMaggusAdr(value as VcfAddress)
  if (Array.isArray(value)) return value.join(",")

  return value
}

function prepareJCard(line: any[]): Line {
  const [name, props, type, value] = line;

  const {group = null, ...rest} = props

  return {
    name,
    props: { ...rest, value: type },
    value: resolveValue(name, value) as any,
    group,
    errors: [],
  };
}

const getVersion = (data: any) => data?.version?.length ? data.version[0].value : null

function parseJCard(value: string | Buffer | any): ParseResult {
  const [begin, content] = value;

  let errs: ParseResult["errors"] = [];

  const { data, lineErrors } = content.reduce(toData(prepareJCard), {
    data: {},
    lineErrors: [],
  });

  const version = getVersion(data)

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
