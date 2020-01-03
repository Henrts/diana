import { WithStylesWrappedProps, WithThemeWrappedProps } from "aesthetic-react";
import { defaultPalette } from "./tokens";

export type Theme = {
  colors: typeof defaultPalette,
  typography: { [key: string]: {} };
  fontFamily: string;
  fonts: {
    [key: string]: {}
  },
  spaceUnit: {
    [key: string]: string
  }
};

export type WithStylesProps = WithStylesWrappedProps<Theme>;
export type WithThemeProps = WithThemeWrappedProps<Theme>;
