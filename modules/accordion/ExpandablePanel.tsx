import React, { useCallback, useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { TextHighlight } from "@diana-ui/typography";

export interface IProps extends StandardProps<"div"> {
  header: string | ((visible: boolean) => React.ReactNode);
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  panel: {
    border: "1px solid black"
  },
  body: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height .5s ease-in-out",
    "@selectors": {
      "&.open": {
        maxHeight: "1000px"
      }
    }
  },
  header: {
    cursor: "pointer"
  },
  headerIcon: {
    transition: "0.2s transform",
    transform: "rotateZ(0deg)",
    "@selectors": {
      "&.open": {
        transform: "rotateZ(-180deg)"
      }
    }
  },
  headerTitle: {}
});

const ExpandablePanel: React.FC<IProps & WithStylesProps> = ({
  children,
  cx,
  header,
  styles
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: any) => {
    console.dir(e);
    setIsOpen(!isOpen);
  };

  const renderHeader = useCallback(
    () =>
      typeof header === "string" ? (
        <div className={cx(styles.header)}>
          <TextHighlight className={cx(styles.headerTitle)}>
            {header}
          </TextHighlight>
          <Icon
            className={cx(styles.headerIcon, isOpen && "open")}
            name="arrow-down"
          />
        </div>
      ) : (
        header(isOpen)
      ),
    [cx, isOpen, styles, header]
  );

  return (
    <div key="HERPA" className={cx(styles.panel)} onClick={handleClick}>
      {renderHeader()}
      <div className={cx(styles.body, isOpen && "open")}>{children}</div>
    </div>
  );
};

export default withStyles(stylesheet)(ExpandablePanel);
