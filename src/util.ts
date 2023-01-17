import { ZodIssue } from "zod";
import addressFormatter from "@fragaria/address-formatter"
import {
  VersionZod,
  VcfFormatError,
  VcfVersionError,
  VcfOptionsError,
  ParseValue,
  VcfError,
  Maggus,
  ParseStatus,
  VcfAddress,
  MaggusAddress,
  MaggusName,
} from "./types";
import { CountQueuingStrategy } from "stream/web";

const capitalDashCase = (str: string) =>
  str.replace(/([A-Z])/g, "-$1").toUpperCase();

/**
 * @desc used to remove specific characters from beginning and end of str
 * @example trim("++moin+meister+", "+") => "+moin+meister"
 */
const trim = (str: string, toRemove: string) =>
  str.split(toRemove).filter(Boolean).join(toRemove);

const tryToJson = <T extends ParseValue>(value: T): T | string => {
  try {
    return JSON.parse(value.toString());
  } catch (err) {
    return value.toString();
  }
};

function getStatus(errs: VcfError[]): ParseStatus {
  if (errs.some((i) => i.isFatal)) return "invalid";

  if (errs.length) return "malformed";

  return "valid";
}

function validateVersion(version: string): VcfError[] {
  if (version == null || version === "")
    return [
      new VcfFormatError(
        `Invalid vCard: expected "VERSION:*" but found "none"`,
        true
      ),
    ];

  if (!VersionZod.safeParse(version).success)
    return [
      new VcfVersionError(
        `Unsupported vCard: "VERSION:${version}" is not supported`,
        true
      ),
    ];
  return [];
}

const getFormat = (value: any) => {
  if (typeof value === "object" && value != null) {
    if (Array.isArray(value)) {
      return "jcard";
    }
    return "maggus";
  }
  return "vcard";
};

const toDataUrl = (value: any, mimeType: string) =>
  `data:${mimeType};charset=UTF-8,${encodeURIComponent(JSON.stringify(value))}`;

const getMimeType = (format: string) => {
  if (format === "vcard") return "text/vcard";
  if (format === "jcard") return "application/json";
  if (format === "maggus") return "application/json";

  throw new Error(`getMimeType() received invalid format "${format}"`);
};

const toVcfOptionsError = (i: ZodIssue) =>
  new VcfOptionsError(i.message + " for " + i.path[0], true);

/* black magic section */

const vcardPattern =
  /BEGIN:VCARD[\s\S]*?VERSION:(2\.1|3\.0|4\.0)[\s\S]*?END:VCARD/gi;

const atLinebreaks = /\r|\n/g;
const whitespace = /^[\s\r\n]+|[\s\r\n]+$/g;
const blankLines = /(\r\n)[\x09\x20]?(\r\n)|$/g;
const foldedLines = /\r\n[\x20\x09]/g;
const propsPattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:([\s\S]+))?$/i;

// change to ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))? in accordance with https://www.rfc-editor.org/rfc/rfc3986#appendix-B
const uriPattern = /\w+:(\/?\/?)[^\s]+/gm;
const timestampPattern =
  /^[0-9]{1,4}[-|\/|\.]?[0-9]{1,2}[-|\/|\.]?[0-9]{1,2}[T| ]?[0-9]{1,2}[:]?[0-9]{1,2}[:]?[0-9]{1,2}[Z]?$/;

function getPropertyType(str: any) {
  if (uriPattern.test(str)) return "uri";

  if (timestampPattern.test(str)) return "timestamp";

  return "text";
}

/**
 * @desc used to seperate the nested json representation into multiple lines,
 * for example multiple phone numbers
 */
const seperateSameValues = <T extends keyof Maggus>(
  prev: Maggus[T][],
  [name, values]: [T, Maggus[T]]
) => [...prev, ...(values ?? []).map((i) => [name, i])];

const toMaggusName = (n: string | any): MaggusName => {

  if (Array.isArray(n)) {
    const [
      surnames,
      givenNames,
      additionalNames,
      prefixes,
      suffixes
    ] = n

    return {
      surnames,
      givenNames,
      additionalNames,
      prefixes,
      suffixes,
    }
  }
  if (typeof n === "string") return toMaggusName(n.split(";"))

  return n
}


const toMaggusAdr = (adr: string | VcfAddress | MaggusAddress): MaggusAddress => {

  if (Array.isArray(adr)) {
    const [
      postOfficeBox,
      extendedAddress,
      street,
      locality,
      region,
      postalCode,
      country
    ] = adr

    return {
      postOfficeBox,
      extendedAddress,
      street,
      locality,
      region,
      postalCode,
      country
    }
  }
  if (typeof adr === "string") return toMaggusAdr(adr.split(";") as VcfAddress)

  return adr
}

const toAddressLabel = (adr: MaggusAddress) => {
  /* 
  street
  locality, region postalCode
  country
  */
 return `${adr.street}\n${adr.locality}, ${adr.region} ${adr.postalCode}\n${adr.country}`
  const formatted = addressFormatter.format({
    street: adr.street,
    locality: adr.locality,
    region: adr.region,
    postcode: adr.postalCode,
    country: adr.country,
  });
  return formatted
}

const toVcfAddressSemicolonStr = (adr: MaggusAddress) => {
  if (typeof adr === "string") return adr

  return Object.values(adr).join(";")
}
const toVcfNameSemicolonStr = (n: MaggusName) => {
  if (typeof n === "string") return n

  return Object.values(n).join(";")
}

const toVcfAddressArr = (adr: MaggusAddress) => Object.values(adr) as VcfAddress

const toVcfNameArr = (n: MaggusName) => Object.values(n)

export {
  toVcfNameSemicolonStr,
  toVcfNameArr,
  toMaggusAdr,
  toAddressLabel,
  toVcfAddressSemicolonStr,
  toVcfAddressArr,
  getFormat,
  capitalDashCase,
  trim,
  tryToJson,
  getStatus,
  validateVersion,
  toDataUrl,
  getMimeType,
  toVcfOptionsError,
  getPropertyType,
  seperateSameValues,
  toMaggusName,
  vcardPattern,
  atLinebreaks,
  whitespace,
  blankLines,
  foldedLines,
  propsPattern,
  uriPattern,
};


