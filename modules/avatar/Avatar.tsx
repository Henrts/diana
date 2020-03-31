import React, { PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import { BodyHighlight } from "@diana-ui/typography";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";

export interface IAvatarProps {
  selected?: boolean;
  wrapperClassName?: string;
  className?: string;

  backgroundColor?: string;
  borderColor?: string;

  size?: "sm" | "md" | "lg";
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sm: {},
  md: {},
  lg: {},
  selected: {}
});

const Avatar: React.FC<PropsWithChildren<WithStylesProps & IAvatarProps>> = ({
  cx,
  styles,
  children,
  backgroundColor,
  borderColor,
  selected,
  wrapperClassName = "",
  size = "md"
}) => {
  return (
    <div
      className={cx(
        styles.wrapper,
        selected && styles.selected,
        styles[size],
        wrapperClassName
      )}
      style={{
        backgroundColor,
        borderColor: borderColor || backgroundColor
      }}
    >
      {(typeof children === "string" && (
        <BodyHighlight>{children}</BodyHighlight>
      )) ||
        children}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default withStyles(styleSheet, { register: true })(Avatar);
