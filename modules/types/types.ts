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
import { defaultPalette } from "@diana-ui/tokens";

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
  pageTitle: IFont;
  subtitle: IFont;
  sectionTitle: IFont;
  buttonText: IFont;
  bodyHighlight: IFont;
  body: IFont;
  descriptionMedium: IFont;
  description: IFont;
  label: IFont;
  labelMedium: IFont;
  notificationsNumbers: IFont;
}
export interface ISpaceUnit {
  /**
   * 4px
   */
  xxs: string;
  /**
   * 8px
   */
  xs: string;
  /**
   * 10.(66)px
   */
  sm: string;
  /**
   * 16px
   */
  md: string;
  /**
   * 24px
   */
  lg: string;
  /**
   * 32px
   */
  xl: string;
  /**
   * 48px
   */
  xxl: string;
}

export type Theme = {
  name: string;
  colors: typeof defaultPalette;
  typography: IFonts;
  icons: {
    [key: string]: any;
  };
  fontFamily: string;
  fontSize: string | number;
  fonts: any;
  animations: any;
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
  /* eslint-disable  @typescript-eslint/no-explicit-any */
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
