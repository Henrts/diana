import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useRef,
  PropsWithChildren,
  ComponentPropsWithRef,
  PropsWithRef
} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ThemeStyleSheetFactory, WithStylesProps } from "../../types";
import { withStyles } from "../../base";
import { StyledComponent } from "aesthetic-react";

type Direction = "bottom" | "left" | "right" | "top";

interface IProps {
  header?: React.ReactNode;
  direction?: Direction;
  dismissOnClick?: boolean;
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

const Popover: React.RefForwardingComponent<
  IPopoverRef,
  PropsWithChildren<IProps & WithStylesProps>
> = ({
  direction = "bottom",
  dismissOnClick = true,
  children,
  header,
  onShow,
  onHide,
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
        <div className={cx(styles.popover, styles[direction])}>
          {children}AA
        </div>
      )}
    </div>
  );
};

const StyledPopover = withStyles(styleSheet)(Popover);

const ForwardedPopover = forwardRef<
  IPopoverRef,
  PropsWithRef<PropsWithChildren<IProps>>
>((props, ref) => (
  <StyledPopover {...props} wrappedRef={ref} />
)) as StyledComponent<
  PropsWithChildren<IProps & { ref: React.Ref<IPopoverRef> }>
>;
ForwardedPopover.displayName = "Popover";

export default StyledPopover;
