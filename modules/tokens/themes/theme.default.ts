import { defaultPalette } from "../palettes";
import { defaultIcons } from "../icons";
import { FontWeight } from "./theme.default.types";

const spaceUnit = 16;
const fontSize = 18;
const fontFamily = "Arial";

export default {
  name: "default_theme",
  colors: defaultPalette,
  fontFamily,
  fonts: {},
  icons: defaultIcons,
  spaceUnit: {
    xxs: `${spaceUnit / 4}px`,
    xs: `${spaceUnit / 2}px`,
    sm: `${spaceUnit / 1.3}px`,
    md: `${spaceUnit}px`,
    lg: `${spaceUnit * 2}px`,
    xl: `${spaceUnit * 3}px`,
    xxl: `${spaceUnit * 4}px`
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
    h1: {
      fontSize: "2rem",
      fontWeight: FontWeight.BOLD,
      lineHeight: "46px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "43px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "39px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    buttonText: {
      fontSize: "1.125rem",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "24px",
      fontFamily
    },
    descriptionMedium: {
      fontSize: "15px",
      fontWeight: FontWeight.MEDIUM,
      lineHeight: "16px",
      fontFamily
    },
    body: {
      fontSize: `${fontSize}px`,
      fontWeight: FontWeight.REGULAR,
      lineHeight: `${fontSize}px`,
      fontFamily
    },
    label: {
      fontSize: "0.66rem",
      fontWeight: FontWeight.REGULAR,
      lineHeight: "0.66rem",
      fontFamily
    }
  }
};
