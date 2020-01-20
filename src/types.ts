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

export type Theme = {
  colors: typeof defaultPalette;
  typography: {
    [key: string]: {
      [key: string]: string;
    };
  };
  fontFamily: string;
  fonts: {
    [key: string]: {};
  };
  spaceUnit: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: { top: string; left: string };
  };
  icons: string[];
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
