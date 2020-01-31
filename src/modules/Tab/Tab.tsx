import React from "react";
import uuid from "uuid";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";

export interface IProps extends StandardProps<"li"> {
  disabled?: boolean;
  id: string;
  selectedTab?: string;
  onTabClick?: (id: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  tab: {
    cursor: "pointer",
    listStyle: "none",
    marginRight: theme.spaceUnit.md,
    maxWidth: "50px",
    "@selectors": {
      "&.selected": {
        borderBottom: "1px solid black"
      },
      "&.disabled": {
        cursor: "default"
      }
    }
  }
});

const Tab: React.FC<IProps & WithStylesProps> = ({
  children,
  className,
  cx,
  disabled,
  id = uuid(),
  selectedTab,
  styles,
  onTabClick = () => {}
}) => {
  const handleClick = () => !disabled && onTabClick(id);
  const stylesArray = cx(
    styles.tab,
    selectedTab === id && "selected",
    disabled && "disabled",
    className
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li className={stylesArray} onClick={handleClick}>
      {children}
    </li>
  );
};

export default withStyles(styleSheet)(Tab);
