export const assetsIndex = `
/**
 * This file was auto-generated! Please do NOT edit directly.
 * Use yarn generate:icons
 */

/* eslint-disable */
/// <reference path="./custom.d.ts" />
/* eslint-enable */

{{#icons}}
export { default as {{{camelCase}}} } from "./icons/{{{original}}}";
{{/icons}}
`;

export const tokensIconsDefault = `
/**
 * This file was auto-generated! Please do NOT edit directly.
 * Use yarn generate:icons
 */

import {
  {{#icons}}
  {{{camelCase}}},
  {{/icons}}
} from "@diana-ui/assets";

export default {
  {{#icons}}
  "{{{kebabCase}}}": {{{camelCase}}},
  {{/icons}}
};
`;
