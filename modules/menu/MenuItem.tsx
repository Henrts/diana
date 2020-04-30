import React from "react";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory,
  StyleBlock
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Body } from "@diana-ui/typography";
import { Icon, IconNames } from "@diana-ui/icon";

export interface IProps extends StandardProps<"li"> {
  icon?: IconNames;
  onClick?: () => void;
}

export interface IMenuItemStyles {
  /**
   * Styles the li
   */
  menuItem?: StyleBlock;
  /**
   * Styles the icon if it has one
   */
  icon?: StyleBlock;
}

type IMenuItemStylesheet<T extends Theme = Theme> = ThemeStyleSheetFactory<T, IMenuItemStyles>;

export const styleSheet: IMenuItemStylesheet = theme => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
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
  wrappedRef,
  ...props
}) => {
  return (
    <li
      className={cx("diana-menu-item", styles.menuItem, className)}
      role="presentation"
      {...props}
      onClick={onClick}
      ref={wrappedRef}
    >
      {icon && <Icon name={icon} className={cx(styles.icon)} size={16} />}
      <Body>{children}</Body>
    </li>
  );
};

export default withStyles<Theme>(styleSheet)(MenuItem);
