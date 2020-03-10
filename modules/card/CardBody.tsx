import React from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {}

const stylesheet: ThemeStyleSheetFactory = () => ({
  body: {
    flex: 1
  }
});

const CardBody: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  children
}) => {
  return <div className={cx(styles.body)}>{children}</div>;
};

export default withStyles(stylesheet)(CardBody);
