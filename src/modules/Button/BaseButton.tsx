import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { withStyles } from "aesthetic-react";
import { WithStylesProps, Theme, StandardProps } from "../../types";
import { ButtonText } from "../Typography";

export interface IProps extends StandardProps<"button"> {
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  danger?: boolean;
}

const styleSheet: StyleSheetFactory<Theme> = theme => ({
  button: {
    color: theme.colors.primary,
    cursor: "pointer",
    outlineStyle: "none",
    display: "flex",
    alignItems: "center"
  },
  danger: {}
});

export const BaseButton: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  disabled,
  danger,
  children,
  renderLeftIcon,
  renderRightIcon,
  ...props
}) => {
  const styleArray = [danger && styles.danger, disabled && styles.disabled];

  return (
    <button
      className={cx(styles.button, ...styleArray)}
      type="submit"
      {...props}
    >
      {renderLeftIcon && renderLeftIcon()}
      <ButtonText>{children}</ButtonText>
      {renderRightIcon && renderRightIcon()}
    </button>
  );
};

export default withStyles(styleSheet, { extendable: true })(BaseButton);
