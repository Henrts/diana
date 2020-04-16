import React, { useMemo } from "react";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps
} from "@diana-ui/types";
import { withStyles, useTheme } from "@diana-ui/base";
import { defaultIcons } from "@diana-ui/tokens";

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
  stroke,
  fill,
  color,
  className,
  src,
  size,
  cx,
  styles,
  ...props
}) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SvgIcon: any = useMemo(() => {
    return src || theme.icons[name] || "";
  }, [src, theme, name]);

  // Building props this way to avoid override svg previous values, only if specified.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  newProps.className = `y-icon ${cx(styles.icon)} ${className || ""}`;

  return <SvgIcon {...props} {...newProps} />;
};

Icon.displayName = "Icon";
export default withStyles(styleSheet, { register: true })(Icon);
