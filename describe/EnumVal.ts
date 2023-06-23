export type EnumValDescription = {
  /** the attribute `ord` of the element `EnumVal` */
  ord?: number;
  /** the attribute `desc` of the element  `EnumVal` */
  desc?: string;
  /** the textContent of the element `EnumVal` */
  content?: string;
};

export function EnumVal(element: Element): EnumValDescription {
  const enumValDescription: EnumValDescription = {};
  Array.from(element.attributes).forEach((attr) => {
    if (attr.name === "ord") enumValDescription.ord = parseInt(attr.value, 10);
    if (attr.name === "desc") enumValDescription.desc = attr.value;
  });

  if (element.textContent) enumValDescription.content = element.textContent;

  return enumValDescription;
}
