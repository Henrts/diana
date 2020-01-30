import React from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { ButtonText } from "../Typography";
import { withStyles } from "../../base";

export interface IProps extends StandardProps<"button"> {
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  danger?: boolean;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  button: {
    color: theme.colors.primary,
    cursor: "pointer",
    outlineStyle: "none",
    display: "flex",
    alignItems: "center",
    "@selectors": {
      "&.disabled": {},
      "&.danger": {}
    }
  },
  buttonText: {}
});

const BaseButton: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  danger,
  className,
  children,
  renderLeftIcon,
  renderRightIcon,
  wrappedRef,
  parentStylesheet,
  aditionalStyles = [],
  ...props
}) => {
  const { disabled } = props;
  const styleArray = [danger && "danger", disabled && "disabled"];
  return (
    <button
      className={cx(styles.button, ...styleArray, ...aditionalStyles)}
      type="submit"
      {...props}
      ref={wrappedRef}
    >
      {renderLeftIcon && renderLeftIcon()}
      <ButtonText className={cx(styles.buttonText)}>{children}</ButtonText>
      {renderRightIcon && renderRightIcon()}
    </button>
  );
};

export default withStyles(styleSheet)(BaseButton);
