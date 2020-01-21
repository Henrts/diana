import aesthetic from "aesthetic";
import AphroditeAdapter from "aesthetic-adapter-aphrodite";
import { defaultTheme } from "./tokens/themes";

export function initDefaultTheme() {
  if (!aesthetic.themes[defaultTheme.name]) {
    aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
      "@global": {},
      "@font-face": theme.fonts
    }));
  }
  aesthetic.configure({
    adapter: new AphroditeAdapter(),
    theme: defaultTheme.name,
    rtl: false,
    extendable: true,
    passThemeProp: true
  });
}

export function registerTheme(themeObj = defaultTheme) {
  aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {},
    "@font-face": theme.fonts
  }));

  aesthetic.configure({
    theme: themeObj.name
  });
}

export function changeTheme(theme: string) {
  aesthetic.changeTheme(theme);
}
