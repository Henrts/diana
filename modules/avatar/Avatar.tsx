import React, { PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IProps {
  size?: "sm" | "md" | "lg";
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  sm: {
    height: 40,
    width: 40
  },
  md: {
    height: 46,
    width: 46
  },
  lg: {
    height: 96,
    width: 96
  },
  wrapper: {
    border: "1px solid black",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    height: "calc(100% - 16px)",
    width: "calc(100% - 16px)",
    borderRadius: "50%",
    border: "1px solid black"
  }
});

const Avatar: React.FC<PropsWithChildren<WithStylesProps & IProps>> = ({
  cx,
  styles,
  children,
  size = "md"
}) => (
  <div className={cx(styles.wrapper, styles[size])}>
    <div className={cx(styles.circle)}>{children}</div>
  </div>
);

Avatar.displayName = "Avatar";

export default withStyles(styleSheet, { register: true })(Avatar);
