import { LitElement, nothing } from "lit";
import "@material/web/all.js";
import type { newHasher } from "./hash.js";
type Description = Record<string, string | string[]> & {
    eNS?: Record<string, Record<string, string>>;
};
export declare class DiffTree extends LitElement {
    ours?: Element;
    theirs?: Element;
    hashers: WeakMap<XMLDocument, {
        hash: import("./hash.js").Hasher;
        db: import("./hash.js").HashDB;
        eDb: import("./hash.js").ElementDB;
    }>;
    depth: number;
    get odd(): boolean;
    expandButton: HTMLElement;
    expanded: boolean;
    get ourHasher(): ReturnType<typeof newHasher> | undefined;
    get theirHasher(): ReturnType<typeof newHasher> | undefined;
    get ourHash(): string | undefined;
    get theirHash(): string | undefined;
    get ourDescription(): Description | undefined;
    get theirDescription(): Description | undefined;
    get diff(): Record<string, {
        ours?: any;
        theirs?: any;
    }>;
    renderChildDiffs(): typeof nothing | import("lit-html").TemplateResult<1>;
    renderAttributeDiff(): typeof nothing | import("lit-html").TemplateResult<1>;
    renderDiff(): import("lit-html").TemplateResult<1>;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
