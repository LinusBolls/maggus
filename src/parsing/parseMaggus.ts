import { validateVersion, getStatus } from "../util";
import type {
  InvalidParseResult,
  Maggus,
  ParseValue,
  ValidParseResult,
  VcfVersion,
} from "../types";

function parseMaggus<T extends Maggus | ValidParseResult<any, "maggus", any>>(
  value: T
): InvalidParseResult | ValidParseResult<T, "maggus", VcfVersion> {
  const data = "data" in value ? value.data : value;

  const version = data["version"][0].value;

  const versionErrs = validateVersion(version);

  const status = getStatus(versionErrs);

  return {
    errors: versionErrs,
    data,
    meta: {
      format: "maggus",
      version,
      status,
    },
  };
}
export default parseMaggus;
