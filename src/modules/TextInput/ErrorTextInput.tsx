import React from "react";
import TextInput, { ITextInputProps } from "./TextInput";
import { WithStylesProps, Theme, ThemeStyleSheetFactory } from "../../types";
import { withStyles } from "../../base";

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  fieldsetError: {
    borderColor: theme.colors.alert.alert100
  },
  errorLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    color: theme.colors.alert.alert100,
    ...theme.fonts.label
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
  error: string | boolean;
}
const ExtendedTextInput = TextInput.extendStyles(stylesheet);
export const ErrorTextInput: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  error,
  ...props
}) => {
  return (
    <div>
      <ExtendedTextInput {...props} hasError={error !== null} />
      {error && typeof error === "string" && (
        <div className={cx(styles.errorLabel)}>{error}</div>
      )}
    </div>
  );
};
export default withStyles(stylesheet)(ErrorTextInput);
