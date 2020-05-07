import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps extends StandardProps<"div"> {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  body: {
    flex: 1
  }
});

const CardBody: React.FC<IProps & WithStylesProps> = ({
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
