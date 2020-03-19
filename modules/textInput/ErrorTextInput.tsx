import React from "react";
import {
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import TextInput, { IProps as ITextInputProps } from "./TextInput";

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  errorLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    color: theme.colors.alert.alert100,
    ...theme.typography.label
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
const ExtendedTextInput = TextInput.extendStyles(stylesheet);
export const ErrorTextInput: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  error,
  hint,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <ExtendedTextInput
        {...props}
        hasError={
          typeof error === "boolean"
            ? error
            : error !== null && error !== undefined
        }
      />
      <div className={cx(styles.errorLabel)}>
        {error && typeof error === "string" ? (
          error
        ) : hint ? (
          <span className={cx(styles.hintLabel)}>{hint}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
};
export default withStyles(stylesheet)(ErrorTextInput);
