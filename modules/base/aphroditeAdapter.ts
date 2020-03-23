/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/unbound-method */
/**
 * This is a complete copy of aesthetic's AphroditeAdapter
 * (https://github.com/milesj/aesthetic/blob/legacy/packages/adapter-aphrodite/src/AphroditeAdapter.ts)
 *
 * The only difference is that aphrodite/no-important is used here to avoid
 * having "!important" on all style rules.
 */
import { Adapter, ClassName, Ruleset, Sheet, SheetMap } from "aesthetic";
import { getStyleElements, purgeStyles } from "aesthetic-utils";
import {
  CSSProperties as NativeBlock,
  StyleSheet as Aphrodite,
  Extension,
  flushToStyleTag,
  reset
} from "aphrodite/no-important";

export interface IParsedBlock {
  _len: number;
  _name: string;
  _definition: NativeBlock;
}

export default class AphroditeAdapter extends Adapter<
  NativeBlock,
  IParsedBlock
> {
  aphrodite: {
    StyleSheet: typeof Aphrodite;
    css(...styles: IParsedBlock[]): ClassName;
  };

  fontFaces: { [fontFamily: string]: NativeBlock[] } = {};

  keyframes: { [animationName: string]: NativeBlock } = {};

  constructor(extensions: Extension[] = []) {
    super();

    this.aphrodite = Aphrodite.extend([
      ...extensions,
      { selectorHandler: this.handleHierarchySelector },
      { selectorHandler: this.handleGlobalSelector }
    ]);

    this.syntax
      .on("attribute", this.handleNested)
      .on("css", this.handleCss)
      .on("font-face", this.handleFontFace)
      .on("global", this.handleGlobal)
      .on("keyframe", this.handleKeyframe)
      .on("media", this.handleMedia)
      .on("property", this.handleProperty)
      .on("pseudo", this.handleNested)
      .on("selector", this.handleNested);
  }

  flushStyles() {
    flushToStyleTag();
  }

  isParsedBlock(block: NativeBlock | IParsedBlock): block is IParsedBlock {
    // eslint-disable-next-line no-underscore-dangle
    return Boolean(block && block._name && block._definition);
  }

  parseStyleSheet(styleSheet: SheetMap<NativeBlock>): SheetMap<IParsedBlock> {
    return this.aphrodite.StyleSheet.create(styleSheet) as SheetMap<
      IParsedBlock
    >;
  }

  purgeStyles() {
    purgeStyles(getStyleElements("data-aphrodite"), true);
    reset();
  }

  transformToClassName(styles: IParsedBlock[]): ClassName {
    return this.aphrodite.css(...styles);
  }

  private handleCss = (css: string) => {
    this.getStyleSheetManager().injectStatements(css);
  };

  // https://github.com/Khan/aphrodite#font-faces
  private handleFontFace = (
    sheet: Sheet<NativeBlock>,
    fontFaces: Ruleset<NativeBlock>[],
    fontFamily: string
  ) => {
    this.fontFaces[fontFamily] = fontFaces.map(face => face.toObject());
  };

  private handleGlobal = (
    sheet: Sheet<NativeBlock>,
    selector: string,
    ruleset: Ruleset<NativeBlock>
  ) => {
    const current: Ruleset<NativeBlock> =
      sheet.ruleSets.globals || sheet.createRuleset("globals");

    current.addNested(`*${selector}`, ruleset);

    sheet.addRuleset(current);
  };

  private handleGlobalSelector(
    selector: string,
    baseSelector: string,
    callback: (selector: string) => string
  ): string | null {
    if (!selector.startsWith("*")) {
      return null;
    }

    return callback(selector.slice(1));
  }

  private handleHierarchySelector(
    selector: string,
    baseSelector: string,
    callback: (selector: string) => string
  ): string | null {
    if (selector.startsWith(">")) {
      return callback(`${baseSelector} ${selector}`);
    }

    if (selector.startsWith("[")) {
      return callback(`${baseSelector}${selector}`);
    }

    return null;
  }

  // https://github.com/Khan/aphrodite#animations
  private handleKeyframe = (
    sheet: Sheet<NativeBlock>,
    keyframe: Ruleset<NativeBlock>,
    animationName: string
  ) => {
    this.keyframes[animationName] = keyframe.toObject();
  };

  // https://github.com/Khan/aphrodite#api
  private handleMedia = (
    ruleset: Ruleset<NativeBlock>,
    query: string,
    value: Ruleset<NativeBlock>
  ) => {
    ruleset.addNested(`@media ${query}`, value);
  };

  // https://github.com/Khan/aphrodite#api
  private handleNested = (
    ruleset: Ruleset<NativeBlock>,
    selector: string,
    value: Ruleset<NativeBlock>
  ) => {
    ruleset.addNested(selector, value);
  };

  // https://github.com/Khan/aphrodite#api
  private handleProperty = (
    ruleset: Ruleset<NativeBlock>,
    name: keyof NativeBlock,
    value: unknown
  ) => {
    if (name === "animationName") {
      ruleset.addCompoundProperty(
        name as "animationName",
        this.syntax.injectKeyframes(String(value), this.keyframes)
      );
    } else if (name === "fontFamily") {
      // Font faces could potentially convert recursively because font faces
      // have a `familyName`, and we parse on `familyName`. Luckily the ruleset
      // selector is the family name, and we can determine that this is being
      // called from from `convertFontFaces`.
      if (String(value).includes(ruleset.selector)) {
        ruleset.addProperty(name, value);
      } else {
        ruleset.addCompoundProperty(
          name as "fontFamily",
          this.syntax.injectFontFaces(String(value), this.fontFaces)
        );
      }
    } else {
      ruleset.addProperty(name, value);
    }
  };
}
