import React, { useRef, useMemo, useEffect, useState } from "react";
import { WithStylesProps, Theme, ThemeStyleSheetFactory, BaseStylesheet } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useScroll } from "@diana-ui/hooks";
import { DescriptionMedium } from "@diana-ui/typography";

export interface ICollapsableProps {
  maxHeight?: number;
  active?: boolean;
  showText?: JSX.Element | string;
  hideText?: JSX.Element | string;
}

export interface ICollapsableStyles {
  wrapper: BaseStylesheet;
  expanded: BaseStylesheet;
  gradient: BaseStylesheet;
  hide: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory<Theme, ICollapsableStyles> = theme => ({
  wrapper: {
    position: "relative",
    overflow: "auto"
  },
  expanded: {
    maxHeight: "none"
  },
  gradient: {
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 49.88%, #ffffff 100%)",
    bottom: 0,
    height: theme.spaceUnit.lg,
    left: 0,
    position: "absolute",
    right: 0
  },
  text: {},
  hide: {}
});

const Collapsable: React.FC<ICollapsableProps & WithStylesProps<Theme, ICollapsableStyles>> = ({
  active = true,
  maxHeight,
  showText,
  hideText,
  cx,
  styles,
  children
}) => {
  const [expanded, setExpanded] = useState(!active);
  useEffect(() => setExpanded(!active), [active]);

  const ref = useRef(null);
  const scroll = useScroll();
  const showGradient = useMemo(() => !scroll.hasScrolledToBottom, [scroll]);
  return (
    <div
      className={cx("collapsable", styles.wrapper, expanded && styles.expanded)}
      style={{ maxHeight }}
      ref={ref}
    >
      {children}
      {!expanded && showGradient && (
        <div className={cx(styles.gradient)} onClick={() => setExpanded(true)}>
          {showText && typeof showText === "string" ? (
            <DescriptionMedium>{showText}</DescriptionMedium>
          ) : (
            showText
          )}
        </div>
      )}
      {expanded && hideText && (
        <div className={cx(styles.gradient, styles.hide)} onClick={() => setExpanded(false)}>
          {typeof hideText === "string" ? (
            <DescriptionMedium className={cx(styles.text)}>{hideText}</DescriptionMedium>
          ) : (
            hideText
          )}
        </div>
      )}
    </div>
  );
};

Collapsable.displayName = "Collapsable";

export default withStyles(styleSheet)(Collapsable);
