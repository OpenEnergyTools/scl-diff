export type HashDB = Record<string, Record<string, object>>;
export type Hasher = (e: Element) => string;
export type XMLTree = (string | Record<string, string> | XMLTree)[];
declare const s: Record<string, (string | object)[]>;
export { s };
