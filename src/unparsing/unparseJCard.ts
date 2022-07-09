import { JCard, JCardProp, Maggus, VCard_Schema, VcfVersion } from "../types";
import { getPropertyType, seperateSameValues } from "../util";

const toLine =
  (version: VcfVersion) =>
  ([name, data]): JCardProp => {
    const { value, ...props } = data.props;
    return [
      name,
      props,
      data.props.value?.length
        ? Array.isArray(data.props.value)
          ? data.props.value[0]
          : data.props.value
        : getPropertyType(data.value),
      data.value.includes(",") ? data.value.split(",") : data.value,
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
