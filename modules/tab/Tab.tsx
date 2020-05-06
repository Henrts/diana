import React, { useMemo } from "react";
import { Flipped } from "react-flip-toolkit";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { SectionTitle } from "@diana-ui/typography";

export interface IProps extends StandardProps<"li"> {
  disabled?: boolean;
  index?: number;
  label: string | JSX.Element;
  selectedTab?: number;
  onTabClick?: (index?: number) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  tab: {
    boxSizing: "border-box",
    cursor: "pointer",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    textAlign: "center",
    margin: `0 ${theme.spaceUnit.xs}`,
    "@selectors": {
      "&:first-child": {
        marginLeft: 0
      },
      "&:last-child": {
        marginRight: 0
      },
      "&.selected": {},
      "&.disabled": {
        cursor: "default"
      }
    }
  },
  label: {
    whiteSpace: "nowrap"
  },
  tabBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.black
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
  onTabClick = () => {},
  wrappedRef
}) => {
  const handleClick = () => !disabled && onTabClick(index);
  const isSelected = useMemo(() => index !== undefined && selectedTab === index, [
    selectedTab,
    index
  ]);
  const stylesArray = cx(
    "diana-tab",
    styles.tab,
    isSelected && "selected",
    disabled && "disabled",
    className
  );

  return (
    <li className={stylesArray} role="menuitem" onClick={handleClick} ref={wrappedRef}>
      <SectionTitle className={cx(styles.label)}>{label}</SectionTitle>

      {isSelected && (
        <Flipped flipId="tab-header-border">
          <div className={cx(styles.tabBorder, disabled && "disabled")} />
        </Flipped>
      )}
    </li>
  );
};

export default withStyles(styleSheet)(Tab);
