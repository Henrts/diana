import aesthetic, {Aesthetic} from "aesthetic";
import AphroditeAdapter from "aesthetic-adapter-aphrodite";
import { defaultTheme } from "./tokens/themes";

export default function initDefaultTheme(): Aesthetic {
    const result = aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
        "@global": {},
        "@font-face": theme.fonts
    }));

    aesthetic.configure({
        adapter: new AphroditeAdapter(),
        theme: defaultTheme.name,
        rtl: false,
        extendable: true,
        passThemeProp: true
    });
    return result;
}


export function registerTheme(themeObj = defaultTheme): Aesthetic {
  const result = aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {},
    "@font-face": theme.fonts
  }));

  aesthetic.configure({
    theme: themeObj.name
  });

  return result;
}

export function changeTheme(theme: string): void {
  aesthetic.changeTheme(theme);
}
