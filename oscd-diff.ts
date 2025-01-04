import { LitElement, html, css } from "lit";
import { property, query } from "lit/decorators.js";
import { newHasher } from "./hash.js";

import "./diff-tree.js";

export default class OscdDiff extends LitElement {
  @query("#doc1") doc1?: HTMLSelectElement;
  @query("#doc2") doc2?: HTMLSelectElement;
  @query("#tag") tag?: HTMLSelectElement;
  @property() docs: Record<string, XMLDocument> = {};

  get docName1(): string {
    return this.doc1?.value || "";
  }

  get docName2(): string {
    return this.doc2?.value || "";
  }

  get tagName(): string {
    return this.tag?.value || "";
  }

  hashers = new WeakMap<XMLDocument, ReturnType<typeof newHasher>>();

  render() {
    return html`<table>
        <tr>
          <td>
            <select id="doc1">
              ${Object.keys(this.docs).map(
                (name) => html`<option value="${name}">${name}</option>`,
              )}
            </select>
          </td>
          <td>-></td>
          <td>
            <select id="doc2">
              ${Object.keys(this.docs).map(
                (name) => html`<option value="${name}">${name}</option>`,
              )}
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <select id="tag">
              <option value="SCL" selected>SCL</option>
            </select>
          </td>
          <td>
            <button
              @click=${() => {
                const doc1 = this.docs[this.docName1];
                const doc2 = this.docs[this.docName2];
                if (!doc1 || !doc2) return;
                if (!this.hashers.has(doc1))
                  this.hashers.set(doc1, newHasher());
                if (!this.hashers.has(doc2))
                  this.hashers.set(doc2, newHasher());
                this.requestUpdate();
                const h1 = this.hashers.get(doc1)!;
                const h2 = this.hashers.get(doc2)!;
                console.time("hash1" + this.docName1);
                const hash1 = h1.hash(doc1.documentElement);
                console.timeEnd("hash1" + this.docName1);
                console.time("hash2" + this.docName2);
                const hash2 = h2.hash(doc2.documentElement);
                console.timeEnd("hash2" + this.docName2);
                console.log(hash1, hash2);
              }}
              }
            >
              diff
            </button>
          </td>
        </tr>
      </table>
      <diff-tree
        .ours=${this.docs[this.docName1]?.documentElement}
        .theirs=${this.docs[this.docName2]?.documentElement}
        .hashers=${this.hashers}
      ></diff-tree> `;
  }

  static styles = css`
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
    .diff > table td:nth-child(3) {
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
    .odd > table {
      border: 0.25em solid var(--oscd-base3);
    }
    details:first-of-type {
      border-top-left-radius: 0.5em;
    }
    table + details:first-of-type {
      border-top-left-radius: 0px;
    }
    details {
      padding-top: 0.1em;
      padding-bottom: 0.1em;
      padding-right: 0px;
      margin-left: 1em;
      background: var(--oscd-base3);
    }
    details.odd {
      background: var(--oscd-base2);
      color: var(--oscd-base01);
    }
    span {
      font-weight: 700;
    }
    details.diff > span {
      background: linear-gradient(90deg, #fcc, #cfc);
    }
    summary {
      padding-left: 0.5em;
      padding-right: 0.5em;
      line-height: 1.5;
      font-weight: 300;
      border-radius: 0.5em;
      width: fit-content;
    }
    summary.old {
      color: var(--oscd-error);
    }
    summary.old:before {
      font-weight: 700;
      content: "- ";
    }
    summary.new {
      color: var(--oscd-primary);
    }
    summary.new:before {
      font-weight: 700;
      content: "+ ";
    }
    body {
      background: floralwhite;
      color: var(--oscd-base00);
    }
    * {
      font-family: var(--oscd-text-font);
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
      display: block;
      padding: 0.5rem;
    }
  `;
}
