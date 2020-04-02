import React, {
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  PropsWithChildren
} from "react";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useOnClickOutside } from "@diana-ui/hooks";
import { Portal, Direction } from "@diana-ui/portal";

export interface IProps extends StandardProps<"div"> {
  direction?: Direction;
  disabled?: boolean;
  dismissOnClick?: boolean;
  renderHeader?: (visible: boolean) => React.ReactNode;
  showOnHover?: boolean;
  useParentWidth?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface IPopoverRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  container: {
    position: "relative"
  },
  disabled: {
    pointerEvents: "none"
  },
  headerWrapper: {
    cursor: "pointer"
  },
  popover: {
    zIndex: 10
  },
  bottom: {},
  top: {},
  left: {},
  right: {}
});

const Popover: React.FC<PropsWithChildren<IProps & WithStylesProps>> = ({
  children,
  className,
  cx,
  direction = "bottom",
  disabled = false,
  dismissOnClick = true,
  renderHeader,
  showOnHover = false,
  styles,
  useParentWidth = false,
  wrappedRef,
  onShow,
  onHide
}) => {
  const [visible, _setVisible] = useState(false);
  const setVisible = useCallback(
    (newVisible: boolean) => {
      const handler = newVisible ? onShow : onHide;
      if (handler) {
        handler();
      }
      _setVisible(newVisible);
    },
    [onHide, onShow]
  );

  const divRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(
    [divRef, portalRef],
    () => dismissOnClick && setVisible(false)
  );
  const toggleVisible = useCallback(() => setVisible(!visible), [
    visible,
    setVisible
  ]);
  useImperativeHandle<IPopoverRef, IPopoverRef>(wrappedRef, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => toggleVisible()
  }));

  const handleClick = showOnHover
    ? undefined
    : () => {
        if (!disabled) {
          toggleVisible();
        }
      };

  const handleMouseEnterLeave = showOnHover
    ? () => {
        if (!disabled) {
          toggleVisible();
        }
      }
    : undefined;

  return (
    <div
      className={cx(styles.container, disabled && styles.disabled, className)}
      ref={divRef}
    >
      <div
        className={cx(styles.headerWrapper)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnterLeave}
        onMouseLeave={handleMouseEnterLeave}
      >
        {renderHeader?.(visible)}
      </div>
      {visible && (
        <Portal
          parentRef={divRef}
          direction={direction}
          useParentWidth={useParentWidth}
        >
          <div
            ref={portalRef}
            className={cx(styles.popover, styles[direction])}
          >
            {children}
          </div>
        </Portal>
      )}
    </div>
  );
};

Popover.displayName = "Popover";

export default withStyles(styleSheet, { register: true })(Popover);
