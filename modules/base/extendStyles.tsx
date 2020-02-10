import aesthetic from "aesthetic";
import { Theme, StyleSheetFactory } from "@diana-ui/types";

function extendStyles<T = Theme>(
  ...styleSheets: StyleSheetFactory<T>[]
): StyleSheetFactory<T> {
  return aesthetic.extendStyles(...styleSheets);
}

export default extendStyles;
