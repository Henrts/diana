import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps extends StandardProps<"section"> {}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  footer: {
    display: "flex",
    alignItems: "flex-end",
    placeContent: "flex-end",

    ">:not(:first-child)": {
      marginLeft: theme.spaceUnit.md
    }
  }
});

const ModalFooter: React.FC<IProps & WithStylesProps> = ({ cx, styles, className, children }) => {
  return (
    <section className={cx("diana-modal-footer", styles.footer, className)}>{children}</section>
  );
};

export default withStyles(stylesheet)(ModalFooter);
