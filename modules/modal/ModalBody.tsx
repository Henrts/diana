import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps extends StandardProps<"section"> {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  body: {
    flex: 1
  }
});

const ModalBody: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  className,
  children,
  wrappedRef
}) => {
  return (
    <section className={cx("diana-modal-body", styles.body, className)} ref={wrappedRef}>
      {children}
    </section>
  );
};

export default withStyles(stylesheet)(ModalBody);
