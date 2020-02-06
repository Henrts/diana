import React, { useMemo } from "react";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps
} from "../../types";
import { useTheme, withStyles } from "../../base";
import { defaultIcons } from "../../tokens/icons";

const styleSheet: ThemeStyleSheetFactory = () => ({
  icon: {}
});

export type IconNames = keyof typeof defaultIcons;

export interface IProps extends StandardProps<"svg"> {
  name: IconNames;
  src?: string;
  size?: number;
}

const Icon: React.FC<IProps & WithStylesProps> = ({
  name,
  height,
  width,
  stroke = "black",
  fill,
  color,
  className,
  src,
  size,
  cx,
  styles
}) => {
  const theme = useTheme();

  const SvgIcon: any = useMemo(() => {
    return src || theme.icons[name] || "";
  }, [src, theme, name]);

  // Building props this way to avoid override svg previous values, only if specified.
  const newProps: any = {
    className: `y-icon ${cx(styles.icon)} ${className || ""}`
  };
  if (size || width) {
    newProps.width = size || width;
  }
  if (size || height) {
    newProps.height = size || height;
  }
  if (fill || color) {
    newProps.fill = fill || color;
  }
  if (stroke || color) {
    newProps.stroke = stroke || color;
  }

  return <SvgIcon {...newProps} />;
};
export default withStyles(styleSheet)(Icon);
