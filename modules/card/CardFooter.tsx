import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps extends StandardProps<"footer"> {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  footer: {
    display: "flex"
  }
});

const CardFooter: React.FC<IProps & WithStylesProps> = ({
  className,
  cx,
  styles,
  children,
  wrappedRef
}) => {
  return (
    <footer className={cx("diana-card-footer", styles.footer, className)} ref={wrappedRef}>
      {children}
    </footer>
  );
};

export default withStyles(stylesheet)(CardFooter);
