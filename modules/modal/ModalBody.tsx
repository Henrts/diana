import React from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  body: {
    flex: 1
  }
});

const ModalBody: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  children
}) => {
  return <section className={cx(styles.body)}>{children}</section>;
};

export default withStyles(stylesheet)(ModalBody);
