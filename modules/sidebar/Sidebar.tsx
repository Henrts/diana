import React, { useEffect, useMemo, useState } from "react";
import {
  BaseStylesheet,
  StandardProps,
  Theme,
  ThemeStyleSheetFactory,
  WithStylesProps
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

enum ESidebarModes {
  SIDE = "side",
  OVER = "over"
}

enum ESidebarDirection {
  LEFT = "left",
  RIGHT = "right"
}

export interface ISidebarProps extends StandardProps<"div"> {
  direction?: ESidebarDirection;
  open?: boolean;
  mode?: ESidebarModes;
  hasOverlay?: boolean; // default true on "push" mode
  animate?: boolean;
  onClose?: () => void;
}

export interface ISidebarStyles {
  /**
   * Styles the sidebar wrapper
   */
  sidebar: BaseStylesheet;
  /**
   * Styles the sidebar overlay
   */
  overlay: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory<Theme, ISidebarStyles> = theme => ({
  sidebar: {
    height: "100%",
    zIndex: 2,
    "@selectors": {
      "&.animate": {
        transition: "0.3s all"
      },
      "&.side": {
        overflow: "hidden",
        width: 0
      },
      "&.side.open": {
        overflow: "initial",
        width: "100%"
      },
      "&.over": {
        position: "absolute" as any,
        transform: "translateX(-100%)"
      },
      "&.over.right": {
        right: 0,
        transform: "translateX(100%)"
      },
      "&.over.open": {
        transform: "translateX(0)"
      },
      "&.over.right.open": {
        right: 0
      }
    }
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: theme.colors.background.overlay,
    zIndex: 1
  }
});

const Sidebar: React.FC<ISidebarProps & WithStylesProps<Theme, ISidebarStyles>> = ({
  cx,
  styles,
  children,
  open,
  mode = ESidebarModes.SIDE,
  hasOverlay,
  animate = true,
  onClose,
  direction = ESidebarDirection.LEFT
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const hasOverlayVar = useMemo(() => {
    if (hasOverlay !== undefined) {
      return hasOverlay;
    }
    return mode !== ESidebarModes.SIDE;
  }, [hasOverlay, mode]);

  return (
    <>
      {isOpen && hasOverlayVar && (
        <div
          className={cx("sidebar-overlay", styles.overlay)}
          onClick={() => {
            setIsOpen(false);
            return onClose?.();
          }}
        />
      )}
      <div
        className={cx(
          "sidebar-content",
          styles.sidebar,
          animate && "animate",
          direction,
          mode,
          isOpen && "open"
        )}
      >
        {children}
      </div>
    </>
  );
};

Sidebar.displayName = "Sidebar";

export default withStyles(styleSheet)(Sidebar);
