import React from "react";
import { Theme, ThemeStyleSheetFactory } from "@diana-ui/types";
import { H1, H2, H3, ButtonText } from "./Typography";
import { useStyles, useTheme } from "@diana-ui/base";
import "../../stories/style.scss";

export const TypographyTable = () => {
  const theme: Theme = useTheme();
  return (
    <table className="typography-table">
      <thead>
        <tr>
          <th></th>
          <th>Element</th>
          <th>Font</th>
          <th>Size</th>
          <th>Weight</th>
          <th>Line Height</th>
          <th>Letter Spacing</th>
        </tr>
      </thead>
      <tbody>
        <tr className="typography-type">
          <td>
            <H1>Heading 1</H1>
          </td>
          <td align="right">&lt;H1&gt;</td>
          <td>{theme.typography.h1.fontFamily}</td>
          <td>{theme.typography.h1.fontSize}</td>
          <td>{theme.typography.h1.fontWeight}</td>
          <td>{theme.typography.h1.lineHeight}</td>
          <td>{theme.typography.h1.letterSpacing}</td>
        </tr>
        <tr className="typography-type">
          <td>
            <H2>Heading 2</H2>
          </td>
          <td align="right">&lt;H2&gt;</td>
          <td>{theme.typography.h2.fontFamily}</td>
          <td>{theme.typography.h2.fontSize}</td>
          <td>{theme.typography.h2.fontWeight}</td>
          <td>{theme.typography.h2.lineHeight}</td>
          <td>{theme.typography.h2.letterSpacing}</td>
        </tr>
        <tr className="typography-type">
          <td>
            <H3>Heading 3</H3>
          </td>
          <td align="right">&lt;H3&gt;</td>
          <td>{theme.typography.h3.fontFamily}</td>
          <td>{theme.typography.h3.fontSize}</td>
          <td>{theme.typography.h3.fontWeight}</td>
          <td>{theme.typography.h3.lineHeight}</td>
          <td>{theme.typography.h3.letterSpacing}</td>
        </tr>
        <tr className="typography-type">
          <td>
            <ButtonText>Button</ButtonText>
          </td>
          <td align="right">&lt;ButtonText&gt;</td>
          <td>{theme.typography.buttonText.fontFamily}</td>
          <td>{theme.typography.buttonText.fontSize}</td>
          <td>{theme.typography.buttonText.fontWeight}</td>
          <td>{theme.typography.buttonText.lineHeight}</td>
          <td>{theme.typography.buttonText.letterSpacing}</td>
        </tr>
      </tbody>
    </table>
  );
};
