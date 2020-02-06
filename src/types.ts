/* eslint-disable @typescript-eslint/no-explicit-any */
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
  StyleSheet as AesStyleSheet,
  ThemeSheet as AesThemeSheet,
  StyleName as AesStyleName
} from "aesthetic";
import { defaultPalette } from "./tokens";

export enum FontWeight {
  REGULAR = 400,
  MEDIUM = 500,
  BOLD = 700,
  BOLDER = 900
}

interface IFont {
  fontSize: string | number;
  fontWeight:
    | FontWeight.REGULAR
    | FontWeight.MEDIUM
    | FontWeight.BOLD
    | FontWeight.BOLDER;
  lineHeight: string | number;
  fontFamily: string;
  letterSpacing: string;
  marginBlockStart?: number;
  marginBlockEnd?: number;
}
export interface IFonts {
  h1: IFont;
  h2: IFont;
  h3: IFont;
  h4?: IFont;
  h5?: IFont;
  buttonText: IFont;
  body: IFont;
  bodyHighlight?: IFont;
  descriptionMedium?: IFont;
  label: IFont;
}
export interface ISpaceUnit {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export type Theme = {
  name: string;
  colors: typeof defaultPalette;
  typography: IFonts;
  icons: {
    [key: string]: string;
  };
  fontFamily: string;
  fonts: any;
  spaceUnit: ISpaceUnit;
  spacing: {
    [key: string]: { top: string; left: string };
  };
};

export type ThemeSheet = AesThemeSheet;

export type StyleSheet = AesStyleSheet;

export type StyleName = AesStyleName;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface StyledComponent<Props>
  extends React.NamedExoticComponent<Props> {
  displayName: string;
  styleName: StyleName;
  WrappedComponent: React.ComponentType<any>;
  extendStyles<T>(
    styleSheet: ThemeStyleSheetFactory<T>,
    extendOptions?: Omit<WithStylesOptions, "extendFrom">
  ): StyledComponent<Props>;
}

export type WithStylesOptions = AesWithStylesOptions & { register?: boolean };

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
