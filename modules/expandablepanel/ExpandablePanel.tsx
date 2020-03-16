import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
  body: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height .3s cubic-bezier(.65,.65,.31,.3)",
    "@selectors": {
      "&.expanded": {
        maxHeight: 300
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
  headerTitle: {},
  panel: {
    border: "1px solid black"
  }
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
  // const bodyRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (isExpanded) {
  //     const cenas = (
  //       <div
  //         id="cenas"
  //         ref={bodyRef}
  //         className={cx(styles.body, { height: "100%" })}
  //       >
  //         {children}
  //       </div>
  //     );

  //     // @ts-ignore
  //     document.body.append(cenas);
  //   }
  // }, [children, cx, isExpanded, styles.body]);

  // state is being controlled by the parent component
  useEffect(() => {
    if (expanded !== undefined) {
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
