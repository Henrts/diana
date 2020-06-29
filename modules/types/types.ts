import React from "react";
import {
  WithStylesWrappedProps as AesWithStylesWrappedProps,
  WithThemeWrappedProps,
  WithThemeWrapperProps,
  WithStylesWrapperProps as AesWithStylesWrapperProps,
  WithStylesOptions as AesWithStylesOptions
} from "aesthetic-react";

import {
  StyleSheet as AesStyleSheet,
  ThemeSheet as AesThemeSheet,
  StyleName as AesStyleName,
  StyleSheetNeverize as AesStyleSheetNeverize,
  StyleBlock as AesStyleBlock,
  Properties as AesProperties
} from "aesthetic";
import { defaultPalette } from "@diana-ui/tokens";

// #region EXPORTS

export {
  StyleSheetFactory as AesStyleSheetFactory,
  StyleBlock as AesStyleBlock,
  Properties as AesProperties
} from "aesthetic";

// #endregion

// #region AESTHETIC-REACT (WITHSTYLES)

export type WithStylesWrappedProps<T = Theme, OwnStyles = {}> = Extract<
  AesWithStylesWrappedProps<T>,
  ICustomWithStylesWrappedProps
> &
  ICustomWithStylesWrappedProps<OwnStyles>;

export type WithStylesProps<T extends Theme = Theme, OwnStyles = {}> = WithStylesWrappedProps<
  T,
  OwnStyles
> &
  WithStylesWrapperProps;
export type WithThemeProps<T extends Theme = Theme> = WithThemeWrappedProps<T> &
  WithThemeWrapperProps;

export type WithStylesWrapperProps = AesWithStylesWrapperProps;

export type StandardProps<C extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[C] & {
  className?: string;
  style?: React.CSSProperties;
  parentStylesheet?: StyleSheet | {} | any;
};

export type ParentStylesheet<Props extends object = {}, StyleSheet = {}> = Props &
  WithStylesProps & {
    parentStylesheet?: StyleSheet;
  };

export type StyledParentStylesheet<Props extends object = {}, StyleSheet = {}> = StyledComponent<
  Props &
    WithStylesWrapperProps & {
      parentStylesheet?: StyleSheet;
    }
>;

export type WithStylesType<T = Theme> = <Props extends object = {}>(
  WrappedComponent: React.ComponentType<ParentStylesheet<Props, ThemeStyleSheetFactory<T>>>
) => StyledParentStylesheet<Props, ThemeStyleSheetFactory<T>>;

// #endregion

// #region AESTHETIC

export type ThemeSheet = AesThemeSheet;

export type StyleSheet = AesStyleSheet;

export type StyleName = AesStyleName;

export type WithStylesOptions = AesWithStylesOptions & { register?: boolean };

export type StyleSheetFactory<ThemeSheet = Theme, T = unknown> = (
  theme: ThemeSheet
) => StyleSheet & AesStyleSheetNeverize<T>;

export type ThemeStyleSheetFactory<BaseTheme = Theme, T = unknown> = StyleSheetFactory<
  BaseTheme,
  T
>;

export interface ICustomWithStylesWrappedProps<OwnStyles = {}> {
  styles?: OwnStyles;
}

export type StyleBlock = AesStyleBlock | undefined;

export type BaseStylesheet = AesProperties;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface StyledComponent<Props, T = Theme> extends React.NamedExoticComponent<Props> {
  displayName: string;
  styleName: StyleName;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  WrappedComponent: React.ComponentType<any>;
  extendStyles(
    styleSheet: ThemeStyleSheetFactory<T | any>,
    extendOptions?: Omit<WithStylesOptions, "extendFrom">
  ): StyledComponent<Props, T>;
}

// #endregion

// #region THEME

export enum FontWeight {
  REGULAR = 400,
  MEDIUM = 500,
  BOLD = 700,
  BOLDER = 900
}

interface IFont {
  fontSize: string | number;
  fontWeight: FontWeight.REGULAR | FontWeight.MEDIUM | FontWeight.BOLD | FontWeight.BOLDER;
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
  [key: string]: IFont | object;
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
   * 12px
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

  [key: string]: string;
}

export type Theme = {
  name: string;
  colors: typeof defaultPalette & { [key: string]: object | string };
  typography: IFonts;
  icons: {
    [key: string]: object | string;
  };
  fontFamily: string;
  fontSize: string | number;
  fonts: object;
  animations?: object;
  spaceUnit: ISpaceUnit;
  spacing: {
    [key: string]: { top: string; left: string };
  };
};

// #endregion
