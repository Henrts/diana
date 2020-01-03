import aesthetic from "aesthetic";
import palette from "../tokens/palettes/palette.default";

export default <T extends keyof typeof palette>(name: T, gradient: 25 | 50 | 100 = 100): string => {
    const theme = aesthetic.getTheme();
    if(theme.colors[name]) {
        return theme.colors[name][name + gradient] || theme.colors[name][`${name}100`];
    } 
    return "#ffffff";
}