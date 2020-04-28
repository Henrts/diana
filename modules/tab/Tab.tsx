import React from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

export interface IProps extends StandardProps<"li"> {
  disabled?: boolean;
  index?: number;
  label: string | JSX.Element;
  selectedTab?: number;
  onTabClick?: (index?: number) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  tab: {
    cursor: "pointer",
    listStyle: "none",
    marginRight: theme.spaceUnit.md,
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
  className,
  cx,
  disabled,
  index,
  label,
  selectedTab,
  styles,
  onTabClick = () => {}
}) => {
  const handleClick = () => !disabled && onTabClick(index);
  const stylesArray = cx(
    styles.tab,
    index !== undefined && selectedTab === index && "selected",
    disabled && "disabled",
    className
  );

  return (
    <li className={stylesArray} role="menuitem" onClick={handleClick}>
      {label}
    </li>
  );
};

export default withStyles(styleSheet)(Tab);
