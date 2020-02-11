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
}
const ExtendedTextInput = TextInput.extendStyles(stylesheet);
export const ErrorTextInput: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  error,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <ExtendedTextInput
        {...props}
        hasError={error !== null && error !== undefined}
      />
      <div className={cx(styles.errorLabel)}>
        {error && typeof error === "string" ? error : <span>&nbsp;</span>}
      </div>
    </div>
  );
};
export default withStyles(stylesheet)(ErrorTextInput);
