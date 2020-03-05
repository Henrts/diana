import React from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  footer: {
    display: "flex"
  }
});

const CardFooter: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  children
}) => {
  return <footer className={cx(styles.footer)}>{children}</footer>;
};

export default withStyles(stylesheet)(CardFooter);
