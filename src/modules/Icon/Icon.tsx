import React, { useMemo } from "react";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps
} from "../../types";
import { useStyles } from "../../base";
import { defaultIcons } from "../../tokens/icons";
import withStyles from "../../base/withStyles";
import useTheme from "../../base/useTheme";

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
  size
}) => {
  const theme = useTheme();
  const [styles, cx] = useStyles(styleSheet);

  const SvgIcon: any = useMemo(() => {
    return src || theme.icons[name] || "";
  }, [src, theme, name]);

  const newProps: any = {};
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
  newProps.className = `y-icon ${cx(styles.icon)} ${className || ""}`;

  return <SvgIcon {...newProps} />;
};
export default withStyles(() => ({}))(Icon);
