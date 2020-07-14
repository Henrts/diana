import React, {
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  PropsWithChildren,
  RefObject,
  useEffect
} from "react";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useOnClickOutside } from "@diana-ui/hooks";
import { Portal, Direction } from "@diana-ui/portal";

export interface IProps extends StandardProps<"div"> {
  centered?: boolean;
  overlayParent?: boolean;
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

export const usePopoverRef = (
  wrappedRef: ((instance: IPopoverRef) => void) | RefObject<IPopoverRef> | null | undefined
) => {
  const ref = useRef<IPopoverRef>(null);

  useImperativeHandle<IPopoverRef, IPopoverRef>(wrappedRef, () => ({
    show: () => ref.current?.show(),
    hide: () => ref.current?.hide(),
    toggle: () => ref.current?.toggle()
  }));
  return ref;
};

const styleSheet: ThemeStyleSheetFactory = () => ({
  container: {
    position: "relative"
  },
  disabled: {
    pointerEvents: "none"
  },
  headerWrapper: {
    "@selectors": {
      "&.clickable": {
        cursor: "pointer"
      }
    }
  },
  content: {
    width: "100%"
  },
  popover: {
    display: "flex",
    width: "100%",
    zIndex: 10
  },
  bottom: {},
  top: {},
  left: {},
  right: {}
});

const Popover: React.FC<PropsWithChildren<IProps & WithStylesProps>> = ({
  centered = false,
  overlayParent = false,
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
      if (newVisible === visible) {
        return;
      }
      const handler = newVisible ? onShow : onHide;
      if (handler) {
        handler();
      }
      _setVisible(newVisible);
    },
    [onHide, onShow, visible]
  );
  const [anchorHover, setAnchorHover] = useState(false);
  const [contentHover, setContentHover] = useState(false);

  useEffect(() => {
    if (showOnHover) {
      let timeout: number | undefined;
      if (!anchorHover && !contentHover) {
        timeout = setTimeout(() => {
          setVisible(false);
        });
      } else if (!disabled) {
        setVisible(true);
      }
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [anchorHover, contentHover, setVisible, disabled, showOnHover]);

  const divRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([divRef, portalRef], () => dismissOnClick && setVisible(false));
  const toggleVisible = useCallback(() => setVisible(!visible), [visible, setVisible]);
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

  const handleMouseEnter = showOnHover
    ? () => {
        setAnchorHover(true);
      }
    : undefined;

  const handleMouseLeaveAnchor = showOnHover
    ? () => {
        setAnchorHover(false);
      }
    : undefined;

  const handleMouseEnterContent = showOnHover
    ? () => {
        setContentHover(true);
      }
    : undefined;

  const handleMouseLeaveContent = showOnHover
    ? () => {
        setContentHover(false);
      }
    : undefined;

  return (
    <div
      className={cx("diana-popover", styles.container, disabled && styles.disabled, className)}
      ref={divRef}
    >
      <div
        className={cx(styles.headerWrapper, !showOnHover && "clickable")}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveAnchor}
      >
        {renderHeader?.(visible)}
      </div>
      {visible && (
        <Portal
          centered={centered}
          overlayParent={overlayParent}
          direction={direction}
          parentRef={divRef}
          useParentWidth={useParentWidth}
        >
          <div
            className={cx(styles.content)}
            onMouseEnter={handleMouseEnterContent}
            onMouseLeave={handleMouseLeaveContent}
          >
            <div className={cx(styles.popover, styles[direction])} ref={portalRef}>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

Popover.displayName = "Popover";

export default withStyles(styleSheet, { register: true })(Popover);
