import React from "react";
import { Theme } from "@diana-ui/types";
import { PageTitle, Subtitle, SectionTitle, ButtonText } from "./Typography";
import { useTheme } from "@diana-ui/base";
// import "../../stories/style.scss";

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
            <PageTitle>Heading 1</PageTitle>
          </td>
          <td align="right">&lt;PageTitle&gt;</td>
          <td>{theme.typography.pageTitle.fontFamily}</td>
          <td>{theme.typography.pageTitle.fontSize}</td>
          <td>{theme.typography.pageTitle.fontWeight}</td>
          <td>{theme.typography.pageTitle.lineHeight}</td>
          <td>{theme.typography.pageTitle.letterSpacing}</td>
        </tr>
        <tr className="typography-type">
          <td>
            <Subtitle>Heading 2</Subtitle>
          </td>
          <td align="right">&lt;Subtitle&gt;</td>
          <td>{theme.typography.subtitle.fontFamily}</td>
          <td>{theme.typography.subtitle.fontSize}</td>
          <td>{theme.typography.subtitle.fontWeight}</td>
          <td>{theme.typography.subtitle.lineHeight}</td>
          <td>{theme.typography.subtitle.letterSpacing}</td>
        </tr>
        <tr className="typography-type">
          <td>
            <SectionTitle>Heading 3</SectionTitle>
          </td>
          <td align="right">&lt;SectionTitle&gt;</td>
          <td>{theme.typography.sectionTitle.fontFamily}</td>
          <td>{theme.typography.sectionTitle.fontSize}</td>
          <td>{theme.typography.sectionTitle.fontWeight}</td>
          <td>{theme.typography.sectionTitle.lineHeight}</td>
          <td>{theme.typography.sectionTitle.letterSpacing}</td>
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
