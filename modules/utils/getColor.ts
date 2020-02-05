import aesthetic from "aesthetic";
import { defaultPalette } from "@diana/tokens";

export default <T extends keyof typeof defaultPalette>(
  name: T,
  gradient: 25 | 50 | 100 = 100
): string => {
  const theme = aesthetic.getTheme();
  if (theme.colors[name]) {
    return (
      theme.colors[name][name + gradient] || theme.colors[name][`${name}100`]
    );
  }
  return "#ffffff";
};
