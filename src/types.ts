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
  },
  button: {
    primaryButton: {
      default: {
        [key: string]: string,
      },
      disabled: {
        [key: string]: string
      },
      active: {
        [key: string]: string
      }
    },
    secondaryButton: {
      default: {
        [key: string]: string,
      },
      disabled: {
        [key: string]: string
      },
      active: {
        [key: string]: string
      }
    },
  }
};

export type WithStylesProps = WithStylesWrappedProps<Theme>;
export type WithThemeProps = WithThemeWrappedProps<Theme>;
