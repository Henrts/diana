import React from "react";
import { Theme, ThemeStyleSheetFactory } from "@diana-ui/types";
import { ButtonText } from "./Typography";
import { useTheme } from "@diana-ui/base";
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
