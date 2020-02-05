/**
 * An extension for Aphrodite that allows prefixing a selector with "&" to
 * indicate the rest of the selector applies to the currently selected element.
 *
 * E.g.
 * {
 *   button: {
 *     "@selectors": {
 *       "&.error": {
 *         ...styles
 *       }
 *     }
 *   }
 * }
 *
 * The selector "&.error" will apply the given styles to the ".button.error" selector.
 *
 * For more information on how Aphrodite extensions work, please see
 * https://github.com/Khan/aphrodite#advanced-extensions
 *
 * @param selector the current/self selector
 * @param baseSelector the parent selector
 * @param generateSubtreeStyles a function that generates the subtree styles based on the given selector
 */
const selfSelectorHandler = (
  selector: string,
  baseSelector: string,
  generateSubtreeStyles: (selector: string) => string,
): string | null => {
  // Only consider selectors that start with "&" and are followed by an id, class or pseudo-class.
  if (
    !selector.startsWith('&') ||
    selector.length <= 1 ||
    (selector[1] !== '.' && selector[1] !== ':' && selector[1] !== '#')
  ) {
    return null;
  }

  const selfSelector = selector.slice(1);

  return generateSubtreeStyles(`${baseSelector}${selfSelector}`);
};

const selfExtension = { selectorHandler: selfSelectorHandler };

export { selfExtension };
