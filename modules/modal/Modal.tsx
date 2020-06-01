import React, { ReactElement } from "react";
import ReactModal, { Props as ReactModalProps, setAppElement } from "react-modal";
import { withStyles } from "@diana-ui/base";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps extends ReactModalProps {
  children: ReactElement[] | ReactElement;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
  },
  content: {
    position: "absolute",
    border: `1px solid ${theme.colors.grey.grey50}`,
    background: theme.colors.white,
    overflow: "auto",
    outline: "none",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
  }
});

type IAllProps = IProps & WithStylesProps;

const Modal: React.FC<IAllProps> = ({
  children,
  className,
  cx,
  styles,
  theme,
  onRequestClose,
  isOpen,
  shouldCloseOnEsc = false,
  shouldCloseOnOverlayClick = false,
  wrappedRef,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClose = (evt: any) => {
    if (onRequestClose) {
      onRequestClose(evt);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={cx("diana-modal", styles.content, className)}
      overlayClassName={cx(styles.overlay)}
      onRequestClose={onClose}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      ref={wrappedRef}
      {...rest}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          ...(child.type.displayName === "ModalHeader"
            ? {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClose: (e: any) => onClose(e)
              }
            : {})
        })
      )}
    </ReactModal>
  );
};

export const ModalSetAppElement = setAppElement;

export default withStyles(stylesheet)(Modal);
