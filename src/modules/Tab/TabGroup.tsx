import React from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";

export interface IProps extends StandardProps<"ul"> {
  children: JSX.Element[];
  disabled?: boolean;
  selectedTab: string;
  onTabClick: (id: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  tabGroup: {
    display: "flex",
    margin: "0",
    padding: "0"
  }
});

const TabGroup: React.FC<IProps & WithStylesProps> = ({
  children,
  className,
  cx,
  disabled,
  selectedTab,
  styles,
  onTabClick
}) => {
  return (
    <ul className={cx(className, styles.tabGroup)}>
      {React.Children.map(children, tab =>
        React.cloneElement(tab, {
          disabled: tab.props.disabled ?? disabled,
          selectedTab,
          onTabClick
        })
      )}
    </ul>
  );
};

export default withStyles(styleSheet)(TabGroup);
