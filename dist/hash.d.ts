export type HashDB = Record<string, Record<string, object>>;
export type IdentityDB = Record<string, string | number>;
export type Hasher = (e: Element) => string;
export interface ElementDB {
    e2h: WeakMap<Element, string>;
    h2e: Map<string, Set<Element>>;
}
export declare function hasher(db: HashDB, eDb: ElementDB, { ignoreAttrs, hashENS, }?: {
    ignoreAttrs?: Set<string>;
    hashENS?: string[];
}): (e: Element) => string;
export declare function newHasher(options?: {}): {
    hash: Hasher;
    db: HashDB;
    eDb: ElementDB;
};
