import aestheticDefault, { Aesthetic } from "aesthetic";
import AphroditeAdapter from "aesthetic-adapter-aphrodite";
import { defaultTheme } from "@diana/tokens";
import { selfExtension } from "./aphroditeExtensions";

export function initDefaultTheme(aesthetic = aestheticDefault) {
  if (!aesthetic.themes[defaultTheme.name]) {
    aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
      "@global": {},
      "@font-face": theme.fonts
    }));
  }
  aesthetic.configure({
    adapter: new AphroditeAdapter([selfExtension]),
    theme: defaultTheme.name,
    rtl: false,
    extendable: true,
    passThemeProp: true
  });
}

export function initTheme(
  themeObj = defaultTheme,
  aesthetic: Aesthetic = aestheticDefault
) {
  if (!aesthetic.themes[defaultTheme.name]) {
    aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
      "@global": {},
      "@font-face": theme.fonts
    }));
  }
  const result = aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {},
    "@font-face": theme.fonts
  }));
  aesthetic.configure({
    adapter: new AphroditeAdapter([selfExtension]),
    theme: themeObj.name,
    rtl: false,
    extendable: true,
    passThemeProp: true
  });
  return result;
}

export function registerTheme(
  themeObj = defaultTheme,
  aesthetic: Aesthetic = aestheticDefault
) {
  aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {},
    "@font-face": theme.fonts
  }));

  aesthetic.configure({
    theme: themeObj.name
  });
}

export function changeTheme(
  theme: string,
  aesthetic: Aesthetic = aestheticDefault
) {
  aesthetic.changeTheme(theme);
}
