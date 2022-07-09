import { VCard_Schema, VcfVersion } from "../types";

function unparseMaggus(maggus: any, version: VcfVersion): VCard_Schema {
  maggus.version[0].value = version;

  return maggus;
}
export default unparseMaggus;
