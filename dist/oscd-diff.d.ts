import { LitElement } from "lit";
import "./diff-tree.js";
export default class OscdDiff extends LitElement {
    doc1?: HTMLSelectElement;
    doc2?: HTMLSelectElement;
    tag?: HTMLSelectElement;
    docs: Record<string, XMLDocument>;
    get docName1(): string;
    get docName2(): string;
    get tagName(): string;
    hashers: WeakMap<XMLDocument, {
        hash: import("./hash.js").Hasher;
        db: import("./hash.js").HashDB;
        eDb: import("./hash.js").ElementDB;
    }>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
