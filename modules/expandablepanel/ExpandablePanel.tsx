import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { TextHighlight } from "@diana-ui/typography";

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  disabled?: boolean;
  expanded?: boolean;
  header: string | ((visible: boolean) => React.ReactNode);
  initialExpanded?: boolean;
  onClick?: () => void;
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  panel: {
    border: "1px solid black"
  },
  body: {
    maxHeight: 0,
    overflow: "hidden",
    // transition: "max-height .5s ease-in-out",
    "@selectors": {
      "&.expanded": {
        maxHeight: "1000px"
      }
    }
  },
  header: {
    cursor: "pointer",
    "@selectors": {
      "&.disabled": {
        cursor: "default"
      }
    }
  },
  headerIcon: {
    transition: "0.2s transform",
    transform: "rotateZ(0deg)",
    "@selectors": {
      "&.expanded": {
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
  disabled,
  expanded,
  initialExpanded,
  onClick,
  styles
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded || false);

  useEffect(() => {
    if (typeof expanded !== "undefined") {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  const handleClick = () => {
    if (disabled) {
      return;
    }

    // state is being controlled internally
    if (expanded === undefined) {
      setIsExpanded(!isExpanded);
    }

    // eslint-disable-next-line mdx/no-unused-expressions
    onClick?.();
  };

  const stateClasses = useMemo(() => {
    const classes = [];

    if (disabled) {
      classes.push("disabled");
    }

    if (isExpanded) {
      classes.push("expanded");
    }

    return classes;
  }, [disabled, isExpanded]);

  const renderHeader = useCallback(
    () =>
      typeof header === "string" ? (
        <div className={cx(styles.header, ...stateClasses)}>
          <TextHighlight className={cx(styles.headerTitle)}>
            {header}
          </TextHighlight>
          <Icon
            className={cx(styles.headerIcon, ...stateClasses)}
            name="arrow-down"
          />
        </div>
      ) : (
        header(isExpanded)
      ),
    [header, cx, styles, stateClasses, isExpanded]
  );

  return (
    <div className={cx(styles.panel, ...stateClasses)} onClick={handleClick}>
      {renderHeader()}
      <div className={cx(styles.body, ...stateClasses)}>{children}</div>
    </div>
  );
};

export default withStyles(stylesheet)(ExpandablePanel);
