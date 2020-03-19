import React, { PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    height: 46,
    width: 46,
    border: "1px solid black",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    height: "calc(100% - 8px)",
    width: "calc(100% - 8px)",
    borderRadius: "50%",
    border: "1px solid black"
  }
});

const Avatar: React.FC<PropsWithChildren<WithStylesProps>> = ({
  cx,
  styles,
  children
}) => (
  <div className={cx(styles.wrapper)}>
    <div className={cx(styles.circle)}>{children}</div>
  </div>
);

Avatar.displayName = "Avatar";

export default withStyles(styleSheet, { register: true })(Avatar);
