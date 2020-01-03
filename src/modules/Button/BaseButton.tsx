import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { withStyles } from "aesthetic-react";
import { WithStylesProps, Theme } from "../../types";
import { ButtonText } from "../Typography";

export interface IProps {
  renderLeftIcon?: () => JSX.Element;
  danger?: boolean;
}

const styleSheet: StyleSheetFactory<Theme> = theme => ({
  button: {
    color: theme.colors.primary,
    cursor: "pointer",
    outlineStyle: "none"
  },
  danger: {}
});

export const BaseButton: React.FC<IProps &
  WithStylesProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >> = ({ styles, cx, disabled, danger, children, renderLeftIcon, ...props }) => {
  const styleArray = [danger && styles.danger, disabled && styles.disabled];

  return (
    <button
      className={cx(styles.button, ...styleArray)}
      type="button"
      {...props}
    >
      {renderLeftIcon && renderLeftIcon()}
      <ButtonText>{children}</ButtonText>
    </button>
  );
};

export default withStyles(styleSheet, { extendable: true })(BaseButton);
