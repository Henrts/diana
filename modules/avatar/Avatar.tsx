import React, { PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import { BodyHighlight } from "@diana-ui/typography";
import { ThemeStyleSheetFactory, WithStylesProps, BaseStylesheet, Theme } from "@diana-ui/types";

// #region TYPES

export interface IAvatarProps {
  /**
   * applies the selected class
   */
  selected?: boolean;
  /**
   * class name for the wrapper element
   */
  wrapperClassName?: string;
  /**
   * set's the background color
   */
  backgroundColor?: string;
  /**
   * set's the background color
   * if none provided it'll use the defined backgroundColor
   */
  borderColor?: string;
  /**
   * avatar size
   * sm | md | lg
   */
  size?: "sm" | "md" | "lg";
}

export interface IAvatarStyles {
  /**
   * styles the wrapper element
   */
  wrapper?: BaseStylesheet;
  /**
   * styles for sm size
   */
  sm?: BaseStylesheet;
  /**
   * styles for md size
   */
  md?: BaseStylesheet;
  /**
   * styles for lg size
   */
  lg?: BaseStylesheet;
  /**
   * styles when avatar is selected
   */
  selected?: BaseStylesheet;
}

// #endregion

const styleSheet: ThemeStyleSheetFactory<Theme, IAvatarStyles> = theme => ({
  wrapper: {
    position: "relative",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@selectors": {
      "&.selected": {},
      ":hover": {}
    }
  },
  sm: {},
  md: {},
  lg: {},
  selected: {}
});

const Avatar: React.FC<PropsWithChildren<WithStylesProps<Theme, IAvatarStyles> & IAvatarProps>> = ({
  cx,
  styles,
  children,
  backgroundColor,
  borderColor,
  selected,
  wrapperClassName = "",
  size = "md",
  wrappedRef
}) => {
  return (
    <div
      className={cx(
        "diana-avatar",
        selected && "selected",
        styles.wrapper,
        styles[size],
        wrapperClassName
      )}
      style={{
        backgroundColor,
        borderColor: borderColor || backgroundColor
      }}
      ref={wrappedRef}
    >
      {(typeof children === "string" && <BodyHighlight>{children}</BodyHighlight>) || children}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default withStyles(styleSheet, { register: true })(Avatar);
