import React from "react";
import {
  WithStylesWrappedProps,
  WithThemeWrappedProps,
  WithThemeWrapperProps,
  WithStylesWrapperProps as AesWithStylesWrapperProps,
  WithStylesOptions as AesWithStylesOptions
} from "aesthetic-react";
import {
  StyleSheetFactory as AesStyleSheetFactory,
  StyleSheet as AesStyleSheet
} from "aesthetic";
import { defaultPalette } from "./tokens";

interface IFont {
    fontSize: string | number,
    fontWeight: 400 | 500 | 700,
    lineHeight: string | number,
    fontFamily: string,
    marginBlockStart?: number,
    marginBlockEnd?: number
}
export interface IFonts {
  h1: IFont;
  h2: IFont;
  h3: IFont;
  buttonText: IFont;
  bodyText: IFont;
  descriptionMedium: IFont;
  label: IFont;
}
export interface ISpaceUnit {
  xxs: string,
  xs: string,
  sm: string,
  md: string,
  lg: string,
  xl: string,
  xxl: string
}

export type Theme = {
  colors: typeof defaultPalette;
  typography: {
    [key: string]: {
      [key: string]: string;
    };
  };
  icons: {
    [key: string] : string
  },
  fontFamily: string;
  fonts: IFonts;
  spaceUnit: ISpaceUnit;
  spacing: {
    [key: string]: { top: string; left: string };
  };
};

export type StyleSheet = AesStyleSheet;

export type WithStylesOptions = AesWithStylesOptions;

export type StyleSheetFactory<
  ThemeSheet = Theme,
  T = unknown
> = AesStyleSheetFactory<ThemeSheet, T>;
export type ThemeStyleSheetFactory<T = unknown> = StyleSheetFactory<Theme, T>;

export type WithStylesProps = WithStylesWrappedProps<Theme> &
  WithStylesWrapperProps;
export type WithThemeProps = WithThemeWrappedProps<Theme> &
  WithThemeWrapperProps;

export type WithStylesWrapperProps = AesWithStylesWrapperProps;

export type StandardProps<
  C extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[C] & {
  // children?: any;
  className?: string;
  style?: React.CSSProperties;
  parentStylesheet?: ThemeStyleSheetFactory;
};
