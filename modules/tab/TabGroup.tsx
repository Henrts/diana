import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Flipper } from "react-flip-toolkit";

export interface ITabGroupRef {
  setTab: (newTab: number) => void;
}

export interface IProps extends StandardProps<"ul"> {
  children: JSX.Element[];
  disabled?: boolean;
  initialTab?: number;
  selectedTab?: number;
  onTabClick?: (id: string | number) => void;
  animate?: boolean;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  tabGroup: {
    display: "flex",
    margin: "0",
    padding: "0",
    overflowX: "auto",
    "@selectors": {
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    "-ms-overflow-style": "none",
    scrollbarWidth: "none"
  },
  tabPanel: {}
});

const TabGroup: React.FC<IProps & WithStylesProps> = ({
  children,
  className,
  cx,
  disabled,
  initialTab = disabled ? undefined : 0,
  selectedTab,
  styles,
  wrappedRef,
  onTabClick,
  animate = true
}) => {
  const [selected, setSelected] = useState(initialTab);

  // state is being controlled by the parent component
  useEffect(() => {
    if (typeof selectedTab !== "undefined") {
      setSelected(selectedTab);
    }
  }, [selectedTab]);

  const handleTabClick = useCallback(
    newTab => {
      // state is being controlled internally
      if (selectedTab === undefined) {
        setSelected(newTab);
      }

      if (onTabClick) {
        onTabClick(newTab);
      }
    },
    [onTabClick, selectedTab]
  );

  useImperativeHandle<ITabGroupRef, ITabGroupRef>(wrappedRef, () => ({
    setTab: newTab => setSelected(newTab)
  }));

  return (
    <>
      <Flipper flipKey={animate && selected}>
        <ul className={cx("diana-tab-group", styles.tabGroup, className)}>
          {React.Children.map(children, (tab, index) =>
            React.cloneElement(tab, {
              disabled: tab.props.disabled ?? disabled,
              index,
              selectedTab: selected,
              onTabClick: handleTabClick
            })
          )}
        </ul>
        <section className={cx(styles.tabPanel)}>
          {selected !== undefined && children[selected]?.props.children}
        </section>
      </Flipper>
    </>
  );
};

export default withStyles(styleSheet)(TabGroup);
