import { z } from "zod";

const jcardValues = [
  "text",
  "uri",
  "date",
  "time",
  "date-time",
  "timestamp",
  "boolean",
  "integer",
  "float",
  "utc offset",
  "language-tag",
];

const supportedFormats: Readonly<[string, ...string[]]> = [
  "maggus",
  "vcard",
  "jcard",
];
type VcfFormat = "maggus" | "vcard" | "jcard";

type VcfVersion = "2.1" | "3.0" | "4.0";

type ParseStatus = "valid" | "malformed" | "invalid";

const supportedVersions: Readonly<[string, ...string[]]> = [
  "2.1",
  "3.0",
  "4.0",
];

const VersionZod = z.enum(supportedVersions);

const ParseOptionsZod = z.object({
  toFormat: z.enum(supportedFormats).default("maggus"),
  toVersion: VersionZod.default("4.0"),
  urlEncode: z.boolean().default(false),
});

type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type VcfFormatFrom<T extends ParseValue> = T extends JCard
  ? "jcard"
  : T extends VCard_Schema
  ? "maggus"
  : VcfFormat;

type ToMaggus<T extends VCard_Schema> = {
  [Key in keyof T]: {
    value: T[Key];
    props: { [key: string]: string | string[] };
    group: string | null;
  }[];
};
type JCardProp = [string, { [key: string]: any }, string, string | string[]];

Object.keys({ moin: "master" });

type ToJCard<T extends VCard_Schema> = [
  "vcard",

  [
    ...[keyof T, { [key: string]: any }, string, string | string[]][]
    // ...TupleUnion<keyof VCard_Schema_V4_0>,
    // ...RequiredKeys<VCard_Schema_V4_0>
  ]
];

type Lit = string | number | boolean | undefined | null | void | {};
const tuple = <T extends Lit[]>(...args: T) => args;

type Maggus<V extends VcfVersion = VcfVersion> = Formats["maggus"][V];
type VCard<V extends VcfVersion = VcfVersion> = Formats["vcard"][V];
type JCard<V extends VcfVersion = VcfVersion> = Formats["jcard"][V];

type Formats = {
  maggus: {
    "4.0": ToMaggus<VCard_Schema_V4_0>;
    "3.0": ToMaggus<VCard_Schema_V3_0>;
    "2.1": ToMaggus<VCard_Schema_V2_1>;
  };
  vcard: {
    "4.0": string;
    "3.0": string;
    "2.1": string;
  };
  jcard: {
    "4.0": ToJCard<VCard_Schema_V4_0>;
    "3.0": ToJCard<VCard_Schema_V3_0>;
    "2.1": ToJCard<VCard_Schema_V2_1>;
  };
};

type ValidParseResult<
  T extends ParseValue,
  F extends VcfFormat,
  V extends VcfVersion
> = {
  errors: VcfError[];
  data: Formats[F][V];
  meta: {
    format: VcfFormatFrom<T>;
    version: VcfVersion;
    status: "valid" | "malformed";
  };
};
type InvalidParseResult = {
  errors: VcfError[];
  data: null;
  meta: {
    format: null;
    version: null;
    status: "invalid";
  };
};

/*
we can't use z.infer<typeof ParseOptionsZod> to dynamically create ParseOptions as this 
would resolve to 'toFormat: string' instead of 'toFormat: "maggus" | "vcard" | "jcard"'
*/
interface ParseOptions {
  toFormat: VcfFormat;
  toVersion: VcfVersion;
  urlEncode: boolean;
}
type ParseValue = Buffer | VCard | JCard | Maggus;

interface VcfError extends Error {
  type: string;
  code: number;
  isFatal: boolean;
  msg: string;
}

class VcfVersionError extends Error implements VcfError {
  type = "VcfVersionError";
  code = 0;
  isFatal: boolean;
  msg: string;

  constructor(message: string, isFatal: boolean) {
    super(message);
    this.msg = message;
    this.isFatal = isFatal;
  }
}

class VcfFormatError extends Error implements VcfError {
  type = "VcfFormatError";
  code = 1;
  isFatal: boolean;
  msg: string;

  constructor(message: string, isFatal: boolean) {
    super(message);
    this.msg = message;
    this.isFatal = isFatal;
  }
}

class VcfOptionsError extends Error implements VcfError {
  type = "VcfOptionsError";
  code = 1;
  isFatal: boolean;
  msg: string;

  constructor(message: string, isFatal: boolean) {
    super(message);
    this.msg = message;
    this.isFatal = isFatal;
  }
}

// https://en.wikipedia.org/wiki/VCard
const PropertiesZod_V2_1 = z.object({
  version: z.string().regex(/2.1/),
  adr: z.string().optional(),
  agent: z.string().optional(),
  bday: z.string().optional(),
  categories: z.string().optional(),
  email: z.string().optional(),
  fn: z.string().optional(),
  geo: z.string().optional(),
  key: z.string().optional(),
  label: z.string().optional(),
  logo: z.string().optional(),
  mailer: z.string().optional(),
  n: z.string(),
  note: z.string().optional(),
  org: z.string().optional(),
  photo: z.string().optional(),
  profile: z.string().optional(),
  rev: z.string().optional(),
  role: z.string().optional(),
  sound: z.string().optional(),
  source: z.string().optional(),
  tel: z.string().optional(),
  title: z.string().optional(),
  tz: z.string().optional(),
  uid: z.string().optional(),
  url: z.string().optional(),
});
type VCard_Schema_V2_1 = z.infer<typeof PropertiesZod_V2_1>;

const PropertiesZod_V3_0 = z.object({
  version: z.string().regex(/3.0/),
  adr: z.string().optional(),
  agent: z.string().optional(),
  bday: z.string().optional(),
  categories: z.string().optional(),
  class: z.string().optional(),
  email: z.string().optional(),
  fn: z.string(),
  geo: z.string().optional(),
  impp: z.string().optional(),
  key: z.string().optional(),
  label: z.string().optional(),
  logo: z.string().optional(),
  mailer: z.string().optional(),
  n: z.string(),
  name: z.string().optional(),
  nickname: z.string().optional(),
  note: z.string().optional(),
  org: z.string().optional(),
  photo: z.string().optional(),
  prodid: z.string().optional(),
  profile: z.string().optional(),
  rev: z.string().optional(),
  role: z.string().optional(),
  sortString: z.string().optional(),
  sound: z.string().optional(),
  source: z.string().optional(),
  tel: z.string().optional(),
  title: z.string().optional(),
  tz: z.string().optional(),
  uid: z.string().optional(),
  url: z.string().optional(),
});
type VCard_Schema_V3_0 = z.infer<typeof PropertiesZod_V3_0>;

const PropertiesZod_V4_0 = z.object({
  version: z.string().regex(/4.0/),
  adr: z.string().optional(),
  anniversary: z.string().optional(),
  bday: z.string().optional(),
  caladruri: z.string().optional(),
  caluri: z.string().optional(),
  categories: z.string().optional(),
  clientpidmap: z.string().optional(),
  email: z.string().optional(),
  fburl: z.string().optional(),
  fn: z.string(),
  gender: z.string().optional(),
  geo: z.string().optional(),
  impp: z.string().optional(),
  key: z.string().optional(),
  kind: z.string().optional(),
  lang: z.string().optional(),
  logo: z.string().optional(),
  member: z.string().optional(),
  n: z.string().optional(),
  nickname: z.string().optional(),
  note: z.string().optional(),
  org: z.string().optional(),
  photo: z.string().optional(),
  prodid: z.string().optional(),
  related: z.string().optional(),
  rev: z.string().optional(),
  role: z.string().optional(),
  sound: z.string().optional(),
  source: z.string().optional(),
  tel: z.string().optional(),
  title: z.string().optional(),
  tz: z.string().optional(),
  uid: z.string().optional(),
  url: z.string().optional(),
  xml: z.string().optional(),
});
type VCard_Schema_V4_0 = z.infer<typeof PropertiesZod_V4_0>;

type VCard_Schema = VCard_Schema_V2_1 | VCard_Schema_V3_0 | VCard_Schema_V4_0;

interface Sache {
  data: { [key: string]: any };
  lineErrors: VcfError[];
}
interface Line {
  name: string;
  props: any;
  value: string;
  group: string | null;
  errors?: VcfError[];
}

export {
  supportedFormats,
  supportedVersions,
  ParseOptionsZod,
  VersionZod,
  PropertiesZod_V2_1,
  PropertiesZod_V3_0,
  PropertiesZod_V4_0,
  ParseValue,
  VCard_Schema_V2_1,
  VCard_Schema_V3_0,
  VCard_Schema_V4_0,
  VCard_Schema,
  VcfVersionError,
  VcfFormatError,
  VcfOptionsError,
  JCardProp,
  JCard,
  Formats,
  Maggus,
};
export type {
  VcfFormat,
  VcfVersion,
  ParseOptions,
  ValidParseResult,
  InvalidParseResult,
  VcfError,
  ParseStatus,
  Sache,
  Line,
};
