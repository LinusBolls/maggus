import camelCase from "camelcase";

import { trim } from "../util";
import type { Line, Sache } from "../types";

function toProps(params: { [key: string]: any }, param: string) {
  const [rawKey, rawValue] = param.split("=");

  const hasValue = rawValue != null;

  const key = hasValue ? rawKey : rawKey === "URI" ? "value" : "type";
  const value = hasValue ? rawValue : rawKey;

  const newKey = camelCase(key);
  const newValue = trim(value, '"').toLowerCase().split(",");

  if (params[newKey]) {
    params[newKey] = [...params[newKey], ...newValue];

    return params;
  }
  return {
    ...params,
    [newKey]: newValue,
  };
}

const toData =
  (lineParser: (line: any) => Line) => (data: Sache, line: any) => {
    const { name, props, value, group, errors } = lineParser(line);

    const result = { value, props, group };

    if (errors?.length) {
      data.lineErrors = [...data.lineErrors, ...errors];
      return data;
    }
    // if (group) {
    //   if (data.data[group] == null) data.data[group] = {};

    //   if (data.data[group][name]) data.data[group][name].push(result);
    //   else data.data[group][name] = [result];
    // } else {
    if (data.data[name]) data.data[name].push(result);
    else data.data[name] = [result];
    // }
    return data;
  };
export { toProps, toData };
