import React, { PropsWithChildren, ReactElement } from "react";
import { useForm, Controller, FieldError } from "react-hook-form";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  StyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";
import TextInput from "../TextInput/TextInput";
import ErrorTextInput from "../TextInput/ErrorTextInput";
import { Checkbox } from "../Checkbox";

const stylesheet: StyleSheetFactory<Theme> = () => ({
  form: {
    display: "flex",
    flexDirection: "column"
  }
});

export interface IFormProps extends StandardProps<"form"> {
  children: ReactElement[];
  onSubmitFunc: (values: { [key: string]: string | boolean }) => void;
  toSubmit?: {
    [key: string]: string;
  };
  schema?: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [key: string]: any;
  };
}
const Form: React.FC<PropsWithChildren<IFormProps & WithStylesProps>> = ({
  children,
  cx,
  styles,
  onSubmitFunc,
  schema,
  parentStylesheet,
  ...props
}) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: schema
  });
  return (
    <form
      {...props}
      className={cx(styles.form)}
      onSubmit={e => {
        handleSubmit(onSubmitFunc)(e);
      }}
    >
      {React.Children.map(children, (Child: ReactElement) => {
        if (Child.type === ErrorTextInput || Child.type === TextInput) {
          const error = errors[Child.props.name];
          return (
            <Controller
              as={React.cloneElement(Child, {
                error: (error as FieldError)?.message
              })}
              name={Child.props.name}
              control={control}
              defaultValue=""
            />
          );
        }
        if (Child.type === Checkbox) {
          return (
            <Controller
              as={Child}
              onChange={([checked]) => {
                return checked.currentTarget.checked;
              }}
              name={Child.props.name}
              control={control}
            />
          );
        }
        return Child;
      })}
    </form>
  );
};

export default withStyles(stylesheet)(Form);
