import React, { useMemo } from "react";
import { WithStylesProps, Theme, ThemeStyleSheetFactory } from "@diana-ui/types";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { withStyles } from "@diana-ui/base";
import { IProps as ITextInputProps } from "./TextInput";

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  helperLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    ...theme.typography.label
  },
  errorLabel: {
    color: theme.colors.alert.alert100
  },
  hintLabel: {
    color: theme.colors.black
  },
  legend: {
    "@selectors": {
      "&.error": {
        color: theme.colors.alert.alert100
      }
    }
  }
});

export interface IProps extends ITextInputProps {
  error?: string | boolean;
  hint?: string;
}

export const ErrorTextInput: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  error,
  hint,
  className,
  parentStylesheet,
  ...props
}) => {
  const BaseTextInput = useRegistryWithStyles<ITextInputProps>("TextInput", stylesheet);
  const ExtendedTextInput = useMemo(
    () => (parentStylesheet ? BaseTextInput.extendStyles(parentStylesheet) : BaseTextInput),
    [parentStylesheet, BaseTextInput]
  );

  return (
    <div className={cx("diana-error-textinput", className)}>
      <ExtendedTextInput
        {...props}
        hasError={typeof error === "boolean" ? error : error !== null && error !== undefined}
      />
      <div className={cx(styles.helperLabel)}>
        {error && typeof error === "string" ? (
          <span className={cx(styles.errorLabel)}>{error}</span>
        ) : hint ? (
          <span className={cx(styles.hintLabel)}>{hint}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
};

ErrorTextInput.displayName = "ErrorTextInput";

export default withStyles(stylesheet, { register: true })(ErrorTextInput);
