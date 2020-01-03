import React from "react";
import { WithStylesWrappedProps, WithThemeWrappedProps } from "aesthetic-react";
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

export type WithStylesProps = WithStylesWrappedProps<Theme>;
export type WithThemeProps = WithThemeWrappedProps<Theme>;

export type StandardProps<C extends keyof JSX.IntrinsicElements> =  JSX.IntrinsicElements[C] & {
  className?: string;
  ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
  style?: React.CSSProperties;
};
