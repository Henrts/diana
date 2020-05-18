import { defaultPalette } from "../palettes";
import { defaultIcons } from "../icons";
import { defaultAnimations } from "../animations";
import { FontWeight } from "./theme.default.types";

export const spaceUnit = 16;
const fontSize = 18;
const fontFamily = "Arial";

export default {
  name: "default_theme",
  colors: defaultPalette,
  fontFamily,
  fontSize,
  fonts: {},
  animations:defaultAnimations,
  icons: defaultIcons,
  spaceUnit: {
    xxs: `${spaceUnit * 0.25}px`,
    xs: `${spaceUnit * 0.5}px`,
    sm: `${spaceUnit * 0.75}px`,
    md: `${spaceUnit}px`,
    lg: `${spaceUnit * 1.5}px`,
    xl: `${spaceUnit * 2}px`,
    xxl: `${spaceUnit * 3}px`,
    xxxl: `${spaceUnit * 4}px`
  },
  spacing: {
    squishsm: {
      top: `${spaceUnit / 4}px`,
      left: `${spaceUnit / 1.3}px`
    },
    squishmd: {
      top: `${spaceUnit / 2}px`,
      left: `${spaceUnit}px`
    },
    squishlg: {
      top: `${spaceUnit}px`,
      left: `${spaceUnit * 2}px`
    },
    stretchsm: {
      left: `${spaceUnit / 4}px`,
      top: `${spaceUnit / 1.3}px`
    },
    stretchmd: {
      left: `${spaceUnit / 2}px`,
      top: `${spaceUnit}px`
    },
    stretchlg: {
      left: `${spaceUnit}px`,
      top: `${spaceUnit * 2}px`
    }
  },
  typography: {
    pageTitle: {
      fontSize: "43xp",
      fontWeight: FontWeight.BOLD,
      lineHeight: "46px",
      fontFamily
    },
    subtitle: {
      fontSize: "31xp",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "36px",
      fontFamily
    },
    sectionTitle: {
      fontSize: "21px",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "28px",
      fontFamily
    },
    buttonText: {
      fontSize: "1.125rem",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "24px",
      fontFamily
    },
    bodyHighlight: {
      fontSize: "18px",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "24px",
      fontFamily
    },
    body: {
      fontSize: "15px",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "16px",
      fontFamily
    },
    descriptionMedium: {
      fontSize: "15px",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "16px",
      fontFamily
    },
    description: {
      fontSize: "15px",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "20px",
      fontFamily
    },
    labelMedium: {
      fontSize: "0.66rem",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "0.66rem",
      fontFamily
    },
    label: {
      fontSize: "0.66rem",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "0.66rem",
      fontFamily
    },
    notificationsNumbers: {
      fontSize: "10px",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "10px",
      fontFamily
    }
  }
};
