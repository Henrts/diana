import React from "react";
import { ISpaceUnit, ThemeStyleSheetFactory } from "../../types";
import { useTheme } from "../../base";

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
  const theme = useTheme();
  const spac = theme.spaceUnit[margin.slice(7) as keyof ISpaceUnit];
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
  const spacTop = theme.spacing[margin].top;
  const numSpacTop = +spacTop.split("px")[0];
  const spacLeft = theme.spacing[margin].left;
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
