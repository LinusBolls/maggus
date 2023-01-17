import { JCard, JCardProp, Maggus, VCard_Schema, VcfAddress, VcfVersion } from "../types";
import { getPropertyType, seperateSameValues, toMaggusAdr, toVcfAddressArr, toAddressLabel, toVcfNameArr } from "../util"; 

type TempType = [string, {
  value: string | [string];
  props: { [key: string]: string | string[] };
  group: string | null;
}]

const resolveDataType = (dataType: string | string[] | undefined, value: string | [string]) => {
  if (dataType == null) return getPropertyType(value) as string
  if (Array.isArray(dataType)) return dataType[0] as string

  return dataType
}

const resolveValue = (name: string, value: string | [string]) => {

  if (name === "adr") return toVcfAddressArr(value as any)
  if (name === "n") return toVcfNameArr(value)

  if (typeof value === "string" && value.includes(",")) return value.split(",")

  return value
}

const toLine =
  (version: VcfVersion) =>
    ([name, data]: TempType): JCardProp => {

      // the actual like value
      const value = data.value

      const { value: dataType, type, ...props } = data.props;

      // if (type?.length) props.type = type[0] as string

      props.type = type

      if (name === "adr") props.label = toAddressLabel(toMaggusAdr(value as string))

      return [
        name,
        props,
        resolveDataType(dataType, value),
        resolveValue(name, value)
      ];
    };

function unparseJCard(maggus: Maggus, version: VcfVersion): JCard {
  const begin = "vcard";

  const content: JCardProp[] = Object.entries(maggus)
    .reduce(seperateSameValues, [])

    .map(toLine(version));

  return [begin, content];
}
export default unparseJCard;
