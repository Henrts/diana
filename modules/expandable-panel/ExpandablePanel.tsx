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
  ThemeStyleSheetFactory,
  Theme
} from "@diana-ui/types";
import { useWindowSize } from "@diana-ui/hooks";
import { Icon } from "@diana-ui/icon";
import { BodyHighlight } from "@diana-ui/typography";
import { ResizeObserver } from "@juggle/resize-observer";

const SLIDE_ANIMATION_DURATION_MS = 200;

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  disabled?: boolean;
  expanded?: boolean;
  header?: string | ((visible: boolean) => React.ReactNode);
  initialExpanded?: boolean;
  onClick?: () => void;
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  body: {
    display: "flex"
  },
  bodyWrapper: {
    overflow: "auto",
    transition: `height ${SLIDE_ANIMATION_DURATION_MS}ms ease-out`
  },
  header: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spaceUnit.xl} ${theme.spaceUnit.lg}`,
    "@selectors": {
      "&.disabled": {
        cursor: "default"
      }
    }
  },
  headerIcon: {
    flexShrink: 1,
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
    overflow: "hidden"
  }
});

/**
 * The ExpandablePanel has a built-in sliding animation when it is expanded/collapsed.
 *
 * To be able to achieve this, the body of the panel must have a fixed height so the css
 * transition works properly.
 * Since the contents of the panel body are dynamic, the body height will be too.
 * Thus, before the animation can be triggered, the body height must be calculated.
 *
 * What happens when a panel is expanded the first time is the following:
 * 1. panel body is rendered in the DOM. It is hidden with overflow: hidden, and with the panel's maxHeight
 *    being set to the panel header's height.
 * 2. Once the panel body height is calculated, it is set to 0 so the animation can trigger and the height
 *    can expand from 0 to the actual height. The panel's maxHeight is reset.
 * 3. Immediately after, the body height is set to its proper value and the animation triggers.
 *
 * If the panel is initially expanded already, the body height can be immediately calculated and step 1. is skipped.
 */
const ExpandablePanel: React.FC<IProps & WithStylesProps> = ({
  children,
  className,
  cx,
  header,
  disabled,
  expanded,
  initialExpanded,
  onClick,
  styles
}) => {
  const windowSize = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(initialExpanded || false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(0);
  const [bodyHeight, setBodyHeight] = useState<number | undefined>(0);
  const [currentBodyHeight, setCurrentBodyHeight] = useState<
    number | undefined
  >(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // calculate header height (once or every time window size changes)
  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight);
  }, [headerRef, windowSize]);

  // observer that keeps track of body height and sets bodyHeight accordingly
  const bodyResizeObserver = useMemo(
    () =>
      new ResizeObserver(entries => {
        entries.forEach(entry => {
          const { blockSize: height } = entry.contentBoxSize[0];

          if (height !== bodyHeight) {
            setBodyHeight(height);
          }
        });
      }),
    [bodyHeight]
  );

  // observe body element resizing if panel is expanded
  useEffect(() => {
    const bodyEl = bodyRef.current;

    if (bodyEl) {
      bodyResizeObserver.observe(bodyEl);
    }

    return () => {
      if (bodyEl) {
        bodyResizeObserver.unobserve(bodyEl);
      }
    };
  }, [isExpanded, bodyResizeObserver]);

  const handleCollapse = useCallback(() => {
    setCurrentBodyHeight(0);
    setIsCollapsing(true);

    // allow the animation to finish before removing the body from the DOM
    setTimeout(() => {
      setIsCollapsing(false);
    }, SLIDE_ANIMATION_DURATION_MS);
  }, []);

  // set body height manually to be able to have the sliding animation
  useEffect(() => {
    if (isExpanded && bodyHeight && bodyHeight > 0) {
      const timeout = setTimeout(() => {
        setCurrentBodyHeight(bodyHeight);
      }, 250);

      return () => clearTimeout(timeout);
    }
  }, [bodyHeight, currentBodyHeight, isExpanded]);

  // state is being controlled by the parent component
  useEffect(() => {
    if (expanded !== undefined) {
      if (!expanded) {
        handleCollapse();
      }

      setIsExpanded(expanded);
    }
  }, [expanded, handleCollapse]);

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    // state is being controlled internally
    if (expanded === undefined) {
      if (isExpanded) {
        handleCollapse();
      }

      setIsExpanded(!isExpanded);
    }

    // eslint-disable-next-line mdx/no-unused-expressions
    onClick?.();
  }, [disabled, expanded, handleCollapse, isExpanded, onClick]);

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
    () => (
      <div
        ref={headerRef}
        className={cx(styles.header, ...stateClasses)}
        onClick={handleClick}
      >
        {typeof header === "string" ? (
          <BodyHighlight className={cx(styles.headerTitle)}>
            {header}
          </BodyHighlight>
        ) : (
          header?.(isExpanded)
        )}
        <Icon
          className={cx(styles.headerIcon, ...stateClasses)}
          name="chevron-down"
          size={16}
        />
      </div>
    ),
    [cx, styles, stateClasses, handleClick, header, isExpanded]
  );

  const isBodyHeightReady = bodyHeight && bodyHeight > 0;
  const canAnimate = isBodyHeightReady && (isExpanded || isCollapsing);
  const finalBodyHeight = canAnimate ? currentBodyHeight : "100%";
  const bodyWrapperStyles = {
    height: finalBodyHeight,
    maxHeight: finalBodyHeight === 0 && !isCollapsing ? 0 : undefined
  };

  return (
    <div
      className={cx(className, styles.panel, ...stateClasses)}
      style={{ maxHeight: canAnimate ? "initial" : `${headerHeight}px` }}
    >
      {renderHeader()}
      {(isExpanded || isCollapsing) && (
        <div style={bodyWrapperStyles} className={cx(styles.bodyWrapper)}>
          <div ref={bodyRef} className={cx(styles.body, ...stateClasses)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(stylesheet)(ExpandablePanel);
