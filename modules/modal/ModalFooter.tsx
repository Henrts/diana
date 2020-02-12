import React from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  footer: {
    height: "64px",
    display: "flex",
    alignItems: "flex-end",
    placeContent: "flex-end",

    ">:not(:first-child)": {
      marginLeft: theme.spaceUnit.md
    }
  }
});

const ModalFooter: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  children
}) => {
  return <section className={cx(styles.footer)}>{children}</section>;
};

export default withStyles(stylesheet)(ModalFooter);
