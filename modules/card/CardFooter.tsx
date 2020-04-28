import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps extends StandardProps<"footer"> {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  footer: {
    display: "flex"
  }
});

const CardFooter: React.FC<IProps & WithStylesProps> = ({ className, cx, styles, children }) => {
  return <footer className={cx(styles.footer, className)}>{children}</footer>;
};

export default withStyles(stylesheet)(CardFooter);
