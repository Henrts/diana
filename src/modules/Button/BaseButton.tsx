import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { withStyles } from "aesthetic-react";
import { StandardProps, Theme, WithStylesProps } from "../../types";
import { ButtonText } from "../Typography";

export interface IProps extends StandardProps<"button"> {
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  danger?: boolean;
  children: JSX.Element[];
}

const styleSheet: StyleSheetFactory<Theme> = theme => ({
  button: {
    color: theme.colors.primary,
    cursor: "pointer",
    outlineStyle: "none",
    display: "flex",
    alignItems: "center"
  },
  danger: {},
  disabled: {}
});

const BaseButton: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  disabled,
  danger,
  children,
  renderLeftIcon,
  renderRightIcon,
  wrappedRef,
  ...props
}) => {
  const styleArray = [danger && styles.danger, disabled && styles.disabled];

  return (
    <button
      className={cx(styles.button, ...styleArray)}
      type="submit"
      {...props}
      ref={wrappedRef}
    >
      {renderLeftIcon && renderLeftIcon()}
      <ButtonText>{children}</ButtonText>
      {renderRightIcon && renderRightIcon()}
    </button>
  );
};

const ForwardedButton = React.forwardRef<
  IProps & WithStylesProps,
  HTMLButtonElement
>((props: any, ref) => <BaseButton wrappedRef={ref} {...props} />);
ForwardedButton.displayName = "BaseButton";

export default withStyles(styleSheet, { extendable: true })(ForwardedButton);
