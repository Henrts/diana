import { defaultPalette } from "../palettes";

const spaceUnit = 16;
const fontSize = 18;
const fontFamily = "Arial";

export default {
  name: "default",
  colors: defaultPalette,
  fontFamily,
  fonts: {},
  spaceUnit: {
    xxs: `${spaceUnit/4}px`,
    xs: `${spaceUnit/2}px`,
    sm: `${spaceUnit/1.3}px`,
    md: `${spaceUnit}px`,
    lg: `${spaceUnit*2}px`,
    xl: `${spaceUnit*3}px`,
    xxl:`${spaceUnit*4}px`,
    squishsm: {
      top: `${spaceUnit/4}px`,
      left: `${spaceUnit/1.3}px`
    },
    squishmd: {
      top: `${spaceUnit/2}px`,
      left: `${spaceUnit}px`
    },
    squishlg: {
      top: `${spaceUnit}px`,
      left: `${spaceUnit*2}px`
    },
    stretchsm: {
      left: `${spaceUnit/4}px`,
      top: `${spaceUnit/1.3}px`
    },
    stretchmd: {
      left: `${spaceUnit/2}px`,
      top: `${spaceUnit}px`
    },
    stretchlg: {
      left: `${spaceUnit}px`,
      top: `${spaceUnit*2}px`
    }
  },

  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: "46px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 400,
      lineHeight: "43px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 400,
      lineHeight: "39px",
      fontFamily,
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    buttonText: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily
    },
    body: {
      fontSize: `${fontSize}px`,
      fontWeight: 400,
      lineHeight: `${fontSize}px`,
      fontFamily
    }
  }
};
