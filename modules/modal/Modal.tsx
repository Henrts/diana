import React, { ReactElement, useState } from "react";
import ReactModal, {
  Props as ReactModalProps,
  setAppElement
} from "react-modal";
import { withStyles } from "@diana-ui/base";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps extends ReactModalProps {
  children: ReactElement[];
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay
  },
  content: {
    position: "absolute",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    outline: "none",
    padding: theme.spaceUnit.lg,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    minWidth: "455px"
  }
});

type IAllProps = IProps & WithStylesProps;

const Modal: React.FC<IAllProps> = ({
  children,
  cx,
  styles,
  theme,
  onRequestClose,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClose = (evt: any) => {
    if (onRequestClose) {
      onRequestClose(evt);
    }
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={cx(styles.content)}
      overlayClassName={cx(styles.overlay)}
      onRequestClose={e => onClose(e)}
      {...rest}
    >
      {React.Children.map(children, (child, ind) =>
        React.cloneElement(child, {
          ...(ind === 0
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
