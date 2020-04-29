import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { ButtonText } from "@diana-ui/typography";

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
    justifyContent: "center"
  },
  danger: {},
  disabled: {},
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

// const ForwardedButton = React.forwardRef<
//   IProps & WithStylesProps,
//   HTMLButtonElement
// >((props: any, ref) => <BaseButton wrappedRef={ref} {...props} />);
// ForwardedButton.displayName = "BaseButton";

export default withStyles(styleSheet)(BaseButton);
