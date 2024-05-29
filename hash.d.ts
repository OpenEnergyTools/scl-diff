export type HashDB = Record<string, Record<string, object>>;
export type IdentityDB = Record<string, string | number>;
export type Hasher = (e: Element) => string;
export declare function hasher(db: HashDB, idDb: IdentityDB, { ignoreAttrs, hashENS, }?: {
    ignoreAttrs?: Set<string>;
    hashENS?: string[];
}): (e: Element) => string;
export declare function newHasher(options?: {}): {
    hash: Hasher;
    db: HashDB;
    idDb: IdentityDB;
};
