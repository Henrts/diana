import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps extends StandardProps<"section"> {}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  card: {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.grey.greenish}`,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }
});

const Card: React.FC<IProps & WithStylesProps> = ({ className, cx, styles, children }) => {
  return <section className={cx(styles.card, className)}>{children}</section>;
};

export default withStyles(stylesheet)(Card);
