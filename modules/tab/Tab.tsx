import React from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Flipped } from "react-flip-toolkit";
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
    padding: `0 ${theme.spaceUnit.xxs}`,
    margin: `0 ${theme.spaceUnit.xs}`,
    "@selectors": {
      "&:first-child": {
        marginLeft: 0
      },
      "&:last-child": {
        marginRight: 0
      },
      "&.selected": {
        // borderBottom: "1px solid black"
      },
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
    height: 2,
    width: "100%",
    borderRadius: 10,
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
  onTabClick = () => {}
}) => {
  const handleClick = () => !disabled && onTabClick(index);
  const isSelected = useMemo(
    () => index !== undefined && selectedTab === index,
    [selectedTab, index]
  );
  const stylesArray = cx(
    styles.tab,
    isSelected && "selected",
    disabled && "disabled",
    className
  );

  return (
    <li className={stylesArray} role="menuitem" onClick={handleClick}>
      <SectionTitle className={cx(styles.label)}>{label}</SectionTitle>

      {isSelected && (
        <Flipped flipId="tab-header-border">
          <div className={cx(styles.tabBorder)} />
        </Flipped>
      )}
    </li>
  );
};

export default withStyles(styleSheet)(Tab);
