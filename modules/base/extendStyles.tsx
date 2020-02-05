import aesthetic from 'aesthetic';
import { Theme, StyleSheetFactory } from '../types/types';

function extendStyles<T = Theme>(
  ...styleSheets: StyleSheetFactory<T>[]
): StyleSheetFactory<T> {
  return aesthetic.extendStyles(...styleSheets);
}

export default extendStyles;
