import React from "react";
import { withStyles } from "@diana-ui/base";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps {}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  card: {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.grey.grey50}`,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }
});

const Card: React.FC<IProps & WithStylesProps> = ({ cx, styles, children }) => {
  return <section className={cx(styles.card)}>{children}</section>;
};

export default withStyles(stylesheet)(Card);
