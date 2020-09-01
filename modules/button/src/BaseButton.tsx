import React from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
  BaseStylesheet,
  Theme
} from "@diana-ui/types";
import { ButtonText } from "@diana-ui/typography";

// #region TYPES

export interface IBaseButtonProps extends StandardProps<"button"> {
  /**
   * react element to be rendered on the left side
   */
  renderLeftIcon?: () => JSX.Element;
  /**
   * react element to be rendered on the right side
   */
  renderRightIcon?: () => JSX.Element;
  /**
   * is button should be styled as danger
   */
  danger?: boolean;
}

export interface IBaseButtonStyles {
  /**
   * extend styles of default button
   */
  button?: BaseStylesheet;
  /**
   * extend styles of danger button
   */
  danger?: BaseStylesheet;
  /**
   * extend styles of disabled button
   */
  disabled?: BaseStylesheet;
  /**
   * styles the button text
   */
  buttonText?: BaseStylesheet;
}

// #endregion

const styleSheet: ThemeStyleSheetFactory<Theme, IBaseButtonStyles> = theme => ({
  button: {
    color: theme.colors.primary,
    cursor: "pointer",
    outlineStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  danger: {},
  disabled: {},
  buttonText: {}
});

const BaseButton: React.FC<IBaseButtonProps & WithStylesProps<Theme, IBaseButtonStyles>> = ({
  styles,
  cx,
  danger,
  className,
  children,
  renderLeftIcon,
  renderRightIcon,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const { disabled } = props;
  const styleArray = [danger && styles.danger, disabled && styles.disabled];

  return (
    <button
      className={cx("diana-button", styles.button, ...styleArray, className)}
      type="submit"
      {...props}
      ref={wrappedRef}
    >
      {renderLeftIcon && renderLeftIcon()}
      {children && <ButtonText className={cx(styles.buttonText)}>{children}</ButtonText>}
      {renderRightIcon && renderRightIcon()}
    </button>
  );
};

export default withStyles(styleSheet)(BaseButton);
