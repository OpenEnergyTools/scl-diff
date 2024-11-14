import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { identity, find } from "@openenergytools/scl-lib";

import "@material/web/all.js";

import type { newHasher } from "./hash.js";

function filterObject(
  obj: object,
  predicate: (entry: [string, any]) => boolean,
) {
  return Object.fromEntries(Object.entries(obj).filter(predicate));
}

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
    return getDiff(this.ourDescription ?? {}, this.theirDescription ?? {});
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

  renderAttributeDiff() {
    const attrDiff = filterObject(
      this.diff,
      ([key]) => !key.startsWith("@") && key !== "eNS",
    );
    const eNSDiff = this.diff.eNS;
    if (!Object.keys(attrDiff).length && !eNSDiff) return nothing;
    return html`<table>
      ${Object.entries(attrDiff).map(
        ([name, { ours, theirs }]) =>
          html`<tr>
            <td></td>
            <td>${name}</td>
            <td>${ours}</td>
            <td>${theirs}</td>
          </tr>`,
      )}
      ${Object.entries(eNSDiff ?? {}).map(([ns, ks]) =>
        Object.entries(ks).map(
          ([k, d]) =>
            html`<tr>
              <td>${ns}</td>
              <td>${k}</td>
              <td>${(d as { ours: string }).ours}</td>
              <td>${(d as { theirs: string }).theirs}</td>
            </tr>`,
        ),
      )},
    </table>`;
  }

  renderDiff() {
    return html`${this.renderAttributeDiff()}${this.renderChildDiffs()}`;
  }

  renderElement() {
    const element = this.ours ?? this.theirs;
    if (!element) return nothing;
    const id = identity(element);
    const tag = element.tagName;
    const description = this.ourDescription ?? this.theirDescription;
    const hash = this.ourHash ?? this.theirHash;
    return html`<md-icon-button toggle @click=${() => this.requestUpdate()}>
        <md-icon>unfold_more</md-icon>
        <md-icon slot="selected">unfold_less</md-icon>
      </md-icon-button>
      <p>${this.ours ? "-" : "+"} ${id}</p>
      ${this.expanded ? this.renderDiff() : ""} `;
  }

  render() {
    if (!this.ours && !this.theirs)
      return html`<p>missing ${this.ours ? "their" : "our"} element</p>`;
    if (!this.ours || !this.theirs) return this.renderElement();
    if (!this.ourHasher || !this.theirHasher)
      return html`<p>missing ${this.ourHasher ? "their" : "our"} hasher</p>`;
    if (!this.ourDescription || !this.theirDescription)
      return html`<p>
        missing ${this.ourDescription ? "their" : "our"} description
      </p>`;
    if (this.ourHash === this.theirHash) return nothing;

    Object.keys(this.ourDescription ?? {}).forEach((key) => {});

    return html`<md-icon-button toggle @click=${() => this.requestUpdate()}>
        <md-icon>unfold_more</md-icon>
        <md-icon slot="selected">unfold_less</md-icon>
      </md-icon-button>
      <p>
        ${identity(this.ours) || this.ours.tagName}
        <md-icon style="--md-icon-size: 1em">arrow_forward</md-icon> ${identity(
          this.theirs,
        ) || this.theirs.tagName}
      </p>
      ${this.expanded ? this.renderDiff() : ""} `;
  }

  static styles = css`
    md-icon-button {
      float: left;
      transform: scale(0.6);
    }
    div {
      margin-left: 1em;
    }
    pre {
      max-width: 100%;
      overflow-x: auto;
    }
    * {
      margin-top: 0px;
    }

    i {
      color: #555a;
    }
    th {
      font-weight: 300;
      opacity: 0.8;
      width: 1%;
      white-space: nowrap;
    }
    th:first-child {
      text-align: right;
      color: var(--oscd-base1);
      padding-right: 0.5em;
    }
    td.arrow {
      width: 2em;
      text-align: center;
      color: var(--oscd-base1);
    }
    .odd > table > tr > th:first-child,
    td.arrow {
      color: var(--oscd-base0);
    }
    th:nth-child(2) {
      text-align: left;
      color: var(--oscd-base0);
      background: var(--oscd-base2);
      padding-right: 1em;
    }
    table td:nth-child(3) {
      text-align: right;
    }
    td:nth-child(5) {
      text-align: left;
    }
    tr:nth-child(2n) td,
    tr:nth-child(2n) th {
      background: var(--oscd-base2);
    }
    tr:nth-child(2n + 1) td,
    tr:nth-child(2n + 1) th {
      background: var(--oscd-base3);
    }
    table {
      border: 0.25em solid var(--oscd-base2);
      table-layout: auto;
      border-collapse: collapse;
      width: max-content;
      margin-left: 1.2em;
      margin-bottom: 0.3em;
      background: none;
    }
    * {
      cursor: default;
      --oscd-primary: var(--oscd-theme-primary, #2aa198);
      --oscd-secondary: var(--oscd-theme-secondary, #6c71c4);
      --oscd-error: var(--oscd-theme-error, #dc322f);
      --oscd-base03: var(--oscd-theme-base03, #002b36);
      --oscd-base02: var(--oscd-theme-base02, #073642);
      --oscd-base01: var(--oscd-theme-base01, #586e75);
      --oscd-base00: var(--oscd-theme-base00, #657b83);
      --oscd-base0: var(--oscd-theme-base0, #839496);
      --oscd-base1: var(--oscd-theme-base1, #93a1a1);
      --oscd-base2: var(--oscd-theme-base2, #eee8d5);
      --oscd-base3: var(--oscd-theme-base3, #fdf6e3);
      --oscd-text-font: var(--oscd-theme-text-font, "Roboto");
    }
    :host {
      font-family: var(--oscd-text-font);
      display: block;
      padding: 0.5rem;
    }
  `;
}
