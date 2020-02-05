import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";

export interface ITabGroupRef {
  setTab: (newTab: number) => void;
}

export interface IProps extends StandardProps<"ul"> {
  children: JSX.Element[];
  disabled?: boolean;
  initialTab?: number;
  selectedTab?: number;
  onTabClick?: (id: string) => void;
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
  initialTab = 0,
  selectedTab,
  styles,
  wrappedRef,
  onTabClick
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
      <ul className={cx(className, styles.tabGroup)}>
        {React.Children.map(children, (tab, index) =>
          React.cloneElement(tab, {
            disabled: tab.props.disabled ?? disabled,
            index,
            selectedTab: selected,
            onTabClick: handleTabClick
          })
        )}
      </ul>
      <section>{children[selected].props.children}</section>
    </>
  );
};

export default withStyles(styleSheet)(TabGroup);
