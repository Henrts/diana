import React, { PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import { DescriptionMedium } from "@diana-ui/typography";
import {
  ThemeStyleSheetFactory,
  WithStylesProps,
  BaseStylesheet,
  Theme,
  StandardProps
} from "@diana-ui/types";

// #region TYPES

export interface IAvatarProps extends StandardProps<"div"> {
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
   */
  size?: "xs" | "sm" | "md" | "lg" | number;
}

export interface IAvatarStyles {
  /**
   * styles the wrapper element
   */
  wrapper?: BaseStylesheet;
  /**
   * styles for xs size
   */
  xs?: BaseStylesheet;
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
  xs: {},
  sm: {},
  md: {},
  lg: {},
  selected: {}
});

export const Avatar: React.FC<PropsWithChildren<
  WithStylesProps<Theme, IAvatarStyles> & IAvatarProps
>> = ({
  cx,
  styles,
  children,
  backgroundColor,
  borderColor,
  selected = false,
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
        borderColor: borderColor || backgroundColor,
        width: typeof size === "number" ? size : undefined,
        height: typeof size === "number" ? size : undefined
      }}
      ref={wrappedRef}
    >
      {(typeof children === "string" && <DescriptionMedium>{children}</DescriptionMedium>) ||
        children}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default withStyles(styleSheet, { register: true })(Avatar);
