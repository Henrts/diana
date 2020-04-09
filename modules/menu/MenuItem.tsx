import React from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Body } from "@diana-ui/typography";
import { Icon, IconNames } from "@diana-ui/icon";

export interface IProps extends StandardProps<"div"> {
  icon?: IconNames;
  onClick?: () => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  menuItem: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spaceUnit.xs
  }
});

const MenuItem: React.FC<IProps & WithStylesProps> = ({
  className,
  children,
  cx,
  styles,
  icon,
  onClick,
  parentStylesheet,
  ...props
}) => {
  return (
    <div
      className={cx(styles.menuItem, className)}
      {...props}
      onClick={onClick}
    >
      {icon && <Icon name={icon} className={cx(styles.icon)} size={16} />}
      <Body>{children}</Body>
    </div>
  );
};

export default withStyles(styleSheet)(MenuItem);
