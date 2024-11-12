import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { identity, find } from "@openenergytools/scl-lib";

import "@material/web/all.js";

import type { newHasher } from "./hash.js";

type Description = Record<string, string | string[]> & {
  eNS?: Record<string, Record<string, string>>;
};

function getDiff(ours: Description, theirs: Description) {
  const diff: Record<string, { ours?: any; theirs?: any }> = {};

  const keys = new Set([...Object.keys(ours), ...Object.keys(theirs)]);

  keys.forEach((key) => {
    if (ours[key] === theirs[key]) return;
    const val = ours[key] ?? theirs[key];
    if (typeof val !== "object")
      diff[key] = { ours: ours[key], theirs: theirs[key] };
    else if (Array.isArray(val)) {
      const arrayDiff = { ours: [] as string[], theirs: [] as string[] };
      const vals = new Set([...ours[key], ...theirs[key]]);
      vals.forEach((val) => {
        const inOurs = ours[key]?.includes(val);
        const inTheirs = theirs[key]?.includes(val);
        if (inOurs && inTheirs) return;
        arrayDiff[inOurs ? "ours" : "theirs"].push(val);
      });
      if (arrayDiff.ours.length || arrayDiff.theirs.length)
        diff[key] = arrayDiff;
    } else if (key === "eNS") {
      const eNSDiff: Record<
        string,
        Record<string, { ours?: string; theirs?: string }>
      > = {};
      const eNS = new Set([
        ...Object.keys(ours.eNS ?? {}),
        ...Object.keys(theirs.eNS ?? {}),
      ]);
      eNS.forEach((ns) => {
        const ks = new Set([
          ...Object.keys(ours.eNS?.[ns] ?? {}),
          ...Object.keys(theirs.eNS?.[ns] ?? {}),
        ]);
        ks.forEach((k) => {
          if (ours.eNS?.[ns]?.[k] === theirs.eNS?.[ns]?.[k]) return;
          eNSDiff[ns] ??= {};
          eNSDiff[ns][k] = {
            ours: ours.eNS?.[ns]?.[k],
            theirs: theirs.eNS?.[ns]?.[k],
          };
        });
      });
      if (Object.keys(eNSDiff).length) diff[key] = eNSDiff;
    } else
      diff[key] = {
        ours: "undiffable data type",
        theirs: "undiffable data type",
      };
  });

  return diff;
}

@customElement("diff-tree")
export class DiffTree extends LitElement {
  @property() ours?: Element;
  @property() theirs?: Element;
  @property() hashers = new WeakMap<
    XMLDocument,
    ReturnType<typeof newHasher>
  >();
  @query("md-icon-button") expandButton!: HTMLElement;

  get expanded(): boolean {
    return this.expandButton?.hasAttribute("selected");
  }

  get ourHasher(): ReturnType<typeof newHasher> | undefined {
    return this.ours ? this.hashers.get(this.ours.ownerDocument) : undefined;
  }
  get theirHasher(): ReturnType<typeof newHasher> | undefined {
    return this.theirs
      ? this.hashers.get(this.theirs.ownerDocument)
      : undefined;
  }

  get ourHash(): string | undefined {
    return this.ourHasher?.hash(this.ours!);
  }
  get theirHash(): string | undefined {
    return this.theirHasher?.hash(this.theirs!);
  }

  get ourDescription(): Description | undefined {
    return this.ourHasher?.db[this.ours!.tagName][this.ourHash ?? ""] as
      | Description
      | undefined;
  }
  get theirDescription(): Description | undefined {
    return this.theirHasher?.db[this.theirs!.tagName][this.theirHash ?? ""] as
      | Description
      | undefined;
  }

  get diff(): Record<string, { ours?: any; theirs?: any }> {
    return getDiff(this.ourDescription!, this.theirDescription!);
  }

  renderChildDiffs() {
    if (!this.expanded) return nothing;
    return html`<div>
      ${Object.entries(this.diff).map(([key, { ours, theirs }]) => {
        if (!key.startsWith("@")) return nothing;
        const tag = key.slice(1);
        const elementDiff: Record<
          string,
          { ours?: Element; theirs?: Element }
        > = {};
        ours.forEach((digest: string) => {
          const element = Array.from(
            this.ourHasher?.eDb.h2e.get(digest)?.values() ?? [],
          ).find((e) => e.tagName === tag);
          if (!element) return;
          const id = identity(element as Element);
          elementDiff[id] ??= {};
          elementDiff[id].ours = element;
        });
        theirs.forEach((digest: string) => {
          const element = Array.from(
            this.theirHasher?.eDb.h2e.get(digest)?.values() ?? [],
          ).find((e) => e.tagName === tag);
          if (!element) return;
          const id = identity(element as Element);
          elementDiff[id] ??= {};
          elementDiff[id].theirs = element;
        });
        console.warn(elementDiff);
        return Object.entries(elementDiff).map(([id, { ours, theirs }]) => {
          return html`<diff-tree
            .ours=${ours}
            .theirs=${theirs}
            .hashers=${this.hashers}
          ></diff-tree>`;
        });
      })}
    </div>`;
  }

  renderDiff() {
    return html`<pre>
${JSON.stringify(this.diff, null, 2)}
</pre>
      ${this.renderChildDiffs()}`;
  }

  render() {
    if (!this.ours || !this.theirs)
      return html`<h2>missing ${this.ours ? "their" : "our"} element</h2>`;
    if (!this.ourHasher || !this.theirHasher)
      return html`<h2>missing ${this.ourHasher ? "their" : "our"} hasher</h2>`;
    if (!this.ourDescription || !this.theirDescription)
      return html`<h2>
        missing ${this.ourDescription ? "their" : "our"} description
      </h2>`;
    if (this.ourHash === this.theirHash) return nothing;

    Object.keys(this.ourDescription ?? {}).forEach((key) => {});

    return html`<h2>
        ${identity(this.ours) || this.ours.tagName}
        <md-icon>arrow_forward</md-icon> ${identity(this.theirs) ||
        this.theirs.tagName}
      </h2>
      <md-icon-button toggle @click=${() => this.requestUpdate()}>
        <md-icon>unfold_more</md-icon>
        <md-icon slot="selected">unfold_less</md-icon>
      </md-icon-button>
      ${this.expanded ? this.renderDiff() : ""} `;
  }
}
