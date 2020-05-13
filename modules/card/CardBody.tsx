import React from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps,
  BaseStylesheet,
  Theme
} from "@diana-ui/types";

export interface ICardBodyProps extends StandardProps<"div"> {}

export interface ICardBodyStyles {
  /**
   * This style affects the CardBody's wrapper element
   */
  body?: BaseStylesheet;
}

const stylesheet: ThemeStyleSheetFactory<Theme, ICardBodyStyles> = () => ({
  body: {
    flex: 1
  }
});

const CardBody: React.FC<ICardBodyProps & WithStylesProps<Theme, ICardBodyStyles>> = ({
  className,
  cx,
  styles,
  children,
  wrappedRef
}) => {
  return (
    <div className={cx("diana-card-body", styles.body, className)} ref={wrappedRef}>
      {children}
    </div>
  );
};

export default withStyles(stylesheet)(CardBody);
