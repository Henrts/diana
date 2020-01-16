import React from "react";
import { Theme, ThemeStyleSheetFactory } from "../../types";
import { H1, H2, H3, ButtonText } from "./Typography";
import { useStyles, useTheme } from "../../base";
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
export const Spacing = () => {
  return (
    <div className="typography-spacing">
      <SpacingDiv margin="spacingxxs">XXS</SpacingDiv>
      <SpacingDiv margin="spacingxs">XS</SpacingDiv>
      <SpacingDiv margin="spacingsm">SM</SpacingDiv>
      <SpacingDiv margin="spacingmd">MD</SpacingDiv>
      <SpacingDiv margin="spacinglg">LG</SpacingDiv>
      <SpacingDiv margin="spacingxl">XL</SpacingDiv>
      <SpacingDiv margin="spacingxxl">XXL</SpacingDiv>
    </div>
  );
};

export const SquishSpacing = () => {
  return (
    <div className="typography-spacing typography-spacing-inset">
      <SquishSpacingDiv margin="squishsm">SM</SquishSpacingDiv>
      <SquishSpacingDiv margin="squishmd">MD</SquishSpacingDiv>
      <SquishSpacingDiv margin="squishlg">LG</SquishSpacingDiv>
    </div>
  );
};
export const StretchSpacing = () => {
  return (
    <div className="typography-spacing typography-spacing-inset">
      <SquishSpacingDiv margin="stretchsm">SM</SquishSpacingDiv>
      <SquishSpacingDiv margin="stretchmd">MD</SquishSpacingDiv>
      <SquishSpacingDiv margin="stretchlg">LG</SquishSpacingDiv>
    </div>
  );
};

const styleSheet: ThemeStyleSheetFactory = theme => ({
  spacingxxs: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.xxs} steelblue`
  },
  spacingxs: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.xs} steelblue`
  },
  spacingsm: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.sm} steelblue`
  },
  spacingmd: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.md} steelblue`
  },
  spacinglg: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.lg} steelblue`
  },
  spacingxl: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.xl} steelblue`
  },
  spacingxxl: {
    boxShadow: `inset 0 0 0 ${theme.spaceUnit.xxl} steelblue`
  }
});
interface IProps {
  margin: string;
}
export const SpacingDiv: React.FC<IProps> = ({ margin, children }) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const spac = theme.spaceUnit[margin.slice(7)];
  const numSpac = +spac.split("px")[0];
  return numSpac > 20 ? (
    <div style={{ boxShadow: `inset 0 0 0 ${spac} steelblue` }}>
      <div className="spacing-spec">{numSpac.toFixed(0)}</div>
      {children}
    </div>
  ) : (
    <div
      style={{
        border: `${spac} solid steelblue`,
        width: 200 - numSpac * 2,
        height: 200 - numSpac * 2
      }}
    >
      <div className="spacing-spec black-spec">{numSpac.toFixed(0)}</div>
      {children}
    </div>
  );
};
const SquishSpacingDiv: React.FC<IProps> = ({ margin, children }) => {
  const theme = useTheme();
  const spacTop = theme.spaceUnit[margin].top;
  const numSpacTop = +spacTop.split("px")[0];
  const spacLeft = theme.spaceUnit[margin].left;
  const numSpacLeft = +spacLeft.split("px")[0];

  return (
    <div
      className="spacing-outside"
      style={{
        padding: `${spacTop} ${spacLeft}`,
        backgroundColor: "steelblue",
        width: 200 - numSpacLeft * 2,
        height: 80 - numSpacTop * 2
      }}
    >
      <div className="spacing-spec-top spacing-spec">
        {numSpacTop.toFixed(0)}
      </div>
      <div className="spacing-spec-left spacing-spec">
        {numSpacLeft.toFixed(0)}
      </div>
      <div className="spacing-inside">{children}</div>
    </div>
  );
};
