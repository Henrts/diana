import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  PropsWithChildren
} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ThemeStyleSheetFactory } from "../../types";
import { useStyles } from "../../base";

type Direction = "bottom" | "left" | "right" | "top";

interface IProps {
  header?: React.ReactNode;
  direction?: Direction;
  dismissOnClick?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface IHandle {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  container: {
    position: "relative"
  },
  header: {
    cursor: "pointer"
  },
  popover: {
    position: "absolute"
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

export const Popover: React.RefForwardingComponent<
  IHandle,
  PropsWithChildren<IProps>
> = (
  {
    direction = "bottom",
    dismissOnClick = true,
    children,
    header,
    onShow,
    onHide
  },
  ref
) => {
  const [styles, cx] = useStyles(styleSheet);
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

  useImperativeHandle<IHandle, IHandle>(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => toggleVisible()
  }));

  return (
    <div className={cx(styles.container)} ref={divRef}>
      <div
        className={cx(styles.header)}
        onClick={() => {
          toggleVisible();
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

const ForwardedButton = forwardRef<IHandle, PropsWithChildren<IProps>>(Popover);
ForwardedButton.displayName = "Popover";

export default ForwardedButton;
