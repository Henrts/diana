import React from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps,
  BaseStylesheet,
  Theme
} from "@diana-ui/types";

export interface ICardFooterProps extends StandardProps<"footer"> {}

export interface ICardFooterStyles {
  /**
   * This style affects the CardFooter's wrapper element
   */
  footer?: BaseStylesheet;
}

const stylesheet: ThemeStyleSheetFactory<Theme, ICardFooterStyles> = () => ({
  footer: {
    display: "flex"
  }
});

export const CardFooter: React.FC<ICardFooterProps & WithStylesProps<Theme, ICardFooterStyles>> = ({
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
