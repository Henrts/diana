import React, { PropsWithChildren, ReactElement, useCallback } from "react";
import { useForm, Controller, FieldError, DeepPartial } from "react-hook-form";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  StyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Checkbox } from "@diana-ui/checkbox";
import { TextInput, ErrorTextInput } from "@diana-ui/textinput";

const stylesheet: StyleSheetFactory<Theme> = () => ({
  form: {
    display: "flex",
    flexDirection: "column"
  }
});

// @ts-ignore
export interface IProps extends StandardProps<"form"> {
  children: ReactElement[];
  onSubmit: (values: { [key: string]: string | boolean }) => void;
  clearOnSubmit?: boolean;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  defaultValues?: DeepPartial<Record<string, any>>;
  schema?: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [key: string]: any;
  };
}
const Form: React.FC<PropsWithChildren<IProps & WithStylesProps>> = ({
  children,
  className,
  cx,
  styles,
  onSubmit,
  clearOnSubmit = true,
  defaultValues,
  schema,
  parentStylesheet,
  ...props
}) => {
  const { handleSubmit, errors, control, reset } = useForm({
    validationSchema: schema,
    defaultValues
  });

  const onSubmitCallback = useCallback(
    (data, e) => {
      if (onSubmit) {
        onSubmit(data);
      }
      if (clearOnSubmit && schema) {
        e.preventDefault();
        let obj: any = {};
        Object.keys(schema.fields).forEach((f: string) => {
          // eslint-disable-next-line no-underscore-dangle
          const type = schema.fields[f]._type;
          if (type === "string") {
            obj[f] = "";
          }
          if (type === "boolean") {
            obj[f] = false;
          }
        });
        if (defaultValues) {
          obj = { ...obj, ...defaultValues };
        }
        reset(obj);
      }
    },
    [defaultValues, schema, clearOnSubmit, reset, onSubmit]
  );
  return (
    <form
      {...props}
      className={cx(styles.form, className)}
      onSubmit={handleSubmit(onSubmitCallback)}
    >
      {React.Children.map(children, (Child: ReactElement) => {
        if (Child.type === ErrorTextInput || Child.type === TextInput) {
          const error = errors[Child.props.name];
          return (
            <Controller
              as={React.cloneElement(Child, {
                error: (error as FieldError)?.message
              })}
              value={Child.props.value}
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
