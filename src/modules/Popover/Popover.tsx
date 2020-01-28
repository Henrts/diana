import React, {
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  PropsWithChildren
} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ThemeStyleSheetFactory, WithStylesProps } from "../../types";
import { withStyles } from "../../base";

type Direction = "bottom" | "left" | "right" | "top";

export interface IProps {
  header?: React.ReactNode;
  direction?: Direction;
  dismissOnClick?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  disabled?: boolean;
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
  header: {
    cursor: "pointer"
  },
  popover: {
    position: "absolute",
    width: "100%"
  },
  bottom: {
    top: "100%"
  },
  top: {
    bottom: "100%"
  },
  left: {
    top: 0,
    bottom: 0,
    right: "100%"
  },
  right: {
    top: 0,
    bottom: 0,
    left: "100%"
  }
});

const Popover: React.FC<PropsWithChildren<IProps & WithStylesProps>> = ({
  direction = "bottom",
  dismissOnClick = true,
  children,
  header,
  onShow,
  onHide,
  disabled = false,
  cx,
  styles,
  wrappedRef
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
    [_setVisible, onShow, onHide]
  );

  const divRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(divRef, () => dismissOnClick && setVisible(false));
  const toggleVisible = useCallback(() => setVisible(!visible), [
    visible,
    setVisible
  ]);
  useImperativeHandle<IPopoverRef, IPopoverRef>(wrappedRef, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => toggleVisible()
  }));

  return (
    <div
      className={cx(styles.container, disabled && styles.disabled)}
      ref={divRef}
    >
      <div
        className={cx(styles.header)}
        onClick={() => {
          if (!disabled) {
            toggleVisible();
          }
        }}
      >
        {header}
      </div>
      {visible && (
        <div className={cx(styles.popover, styles[direction])}>{children}</div>
      )}
    </div>
  );
};

const StyledPopover = withStyles(styleSheet)(Popover);

export default StyledPopover;
