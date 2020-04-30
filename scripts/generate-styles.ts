/* eslint-disable array-callback-return */
import fs from "fs";
import themeTokens, {
  spaceUnit as baseSpace
} from "../modules/tokens/themes/theme.default";

let outputText = `
  :root {
`;

// eslint-disable-next-line import/no-named-as-default-member
const { colors, fontSize, spaceUnit }: any = themeTokens;

/**
 * COLORS
 */

Object.keys(colors).map(colorKey => {
  if (typeof colors[colorKey] === "object") {
    Object.keys(colors[colorKey]).map(subColorKey => {
      outputText += `
    --color-${colorKey}-${subColorKey}: ${colors[colorKey][subColorKey]};`;
    });
  } else {
    outputText += `
    --color-${colorKey}: ${colors[colorKey]};`;
  }
});

/**
 * SPACING
 */

outputText += `


    --space-unit: ${baseSpace}px;`;
Object.keys(spaceUnit).map(spaceKey => {
  outputText += `
    --space-${spaceKey}: ${spaceUnit[spaceKey]};`;
});

/**
 * FONT-SIZE
 */

outputText += `


    --font-size: ${fontSize}px;`;

outputText += `
}`;

fs.writeFileSync("modules/tokens/index.scss", outputText);
