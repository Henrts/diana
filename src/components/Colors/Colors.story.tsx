import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { Theme } from "../../types";
import { useStyles, useTheme } from "aesthetic-react";
import { H3 } from "../Typography/Typography"
import { defaultPalette } from "../../tokens";

export const Colors = () => {
    const theme = useTheme();

    const colors: any = [];
    Object.keys(theme.colors).map((key: string) => {
        colors.push(key);
    })
    return (
        <table className="colors-table">
            <tbody>
                {colors.map((colorName:string) => (
                    <tr key={colorName} className="row">
                        <td><H3>{colorName.charAt(0).toUpperCase() + colorName.substring(1)}</H3></td>
                        <td><ColorDiv color={colorName}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
} 

const styleSheet: StyleSheetFactory<Theme> = theme => {   
    let res: any = {};
    Object.keys(theme.colors).map((key: string) => {
        const t: any = theme.colors;
        const isObject = typeof t[key] !== "string";
        if(isObject) {
            res[`${key}25`] = {
                backgroundColor: t[key][`${key}25`]
            }
            res[`${key}50`] = {
                backgroundColor: t[key][`${key}50`]
            }
            res[`${key}100`] = {
                backgroundColor: t[key][`${key}100`]
            }
        } else {
            res[key] = {
                backgroundColor: t[key]
            }
        }
    })
    console.log(res);
    return res;
};
interface IColorsProps {
    color: string;
}
const ColorDiv: React.FC<IColorsProps> = ({ color }) => {
    const [styles, cx] = useStyles(styleSheet);
    const theme = useTheme();
    const isObject = typeof theme.colors[color];
    console.log(isObject);
    return isObject === "string" ? <div className="color-div-container">
        <div className={cx(styles[color], "color-div")} />
    </div> : <div className="color-div-container">
        <div className={cx(styles[`${color}25`], "color-div")} />
        <div className={cx(styles[`${color}50`], "color-div")} />
        <div className={cx(styles[`${color}100`], "color-div")} />
    </div>

}