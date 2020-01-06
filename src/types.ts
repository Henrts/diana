import React from "react";
import {
  WithStylesWrappedProps,
  WithStylesWrapperProps,
  WithThemeWrappedProps,
  WithThemeWrapperProps
} from "aesthetic-react";
import { defaultPalette } from "./tokens";

export type Theme = {
  colors: typeof defaultPalette,
  typography: { [key: string]: {
    [key: string]: string;
  }};
  fontFamily: string;
  fonts: {
    [key: string]: {}
  },
  spaceUnit: {
    [key: string]: string
  },
  icons: string[]
};

export type WithStylesProps = WithStylesWrappedProps<Theme> & WithStylesWrapperProps;
export type WithThemeProps = WithThemeWrappedProps<Theme> & WithThemeWrapperProps;

export type StandardProps<C extends keyof JSX.IntrinsicElements> =  JSX.IntrinsicElements[C] & {
  className?: string;
  style?: React.CSSProperties;
};
