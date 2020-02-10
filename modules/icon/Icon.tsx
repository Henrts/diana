import React from "react";
import { ReactSVG } from "react-svg";
import { useTheme } from "aesthetic-react";
import { StandardProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { useStyles } from "@diana-ui/base";

const styleSheet: ThemeStyleSheetFactory = () => ({
  icon: {
    display: "block",
    "> div": {
      display: "flex"
    }
  }
});

export type IconNames = "add" | "arrow" | "arrow-down" | "check" | "close";

export interface IIconProps extends StandardProps<"svg"> {
  name: string;
  src?: string;
  size?: number;
}
const Icon: React.FC<IIconProps> = ({
  name,
  height,
  width,
  stroke = "black",
  fill,
  color,
  className,
  src,
  size
}) => {
  const theme = useTheme();
  const svgIcon = src || (theme && `assets/icons/${theme.icons[name]}`);
  const [styles, cx] = useStyles(styleSheet);
  return (
    <ReactSVG
      src={svgIcon}
      className={cx(styles.icon)}
      beforeInjection={svg => {
        svg.setAttribute("class", "y-icon");
        svg.setAttribute("class", `${svg.getAttribute("class")} ${className}`);
        if (size) {
          svg.setAttribute("height", size.toString());
          svg.setAttribute("width", size.toString());
        }
        if (height) {
          svg.setAttribute("height", height.toString());
        }
        if (width) {
          svg.setAttribute("width", width.toString());
        }
        if (stroke) {
          svg.setAttribute("stroke", stroke);
        }
        if (fill) {
          svg.setAttribute("fill", fill);
        }
        if (color) {
          svg.setAttribute("fill", color);
          svg.setAttribute("stroke", color);
        }
      }}
    />
  );
};
export default Icon;
