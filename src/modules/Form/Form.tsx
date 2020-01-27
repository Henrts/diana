import React, { PropsWithChildren, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  StyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";
import TextInput from "../TextInput/TextInput";

const stylesheet: StyleSheetFactory<Theme> = (theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column"
  }
});
const Form: React.FC<PropsWithChildren<
  StandardProps<"form"> & WithStylesProps
>> = ({ children, cx, styles }) => {
  const { register, handleSubmit, watch, errors, control } = useForm();

  const onSubmit = (e: any) => {
    console.log("Submitted", e);
  };

  console.log(watch("username"));
  console.log(errors);

  return (
    <form className={cx(styles.form)} onSubmit={handleSubmit(onSubmit)}>
      {children}
      {/* <Controller as={<TextInput label="Username2" />} name="username" control={control} />
        <Controller rules={{ required: true }} as={<TextInput type="password" label="Password2"/>} name="password" control={control} />
        <input type="submit" /> */}
    </form>
  );
};

interface IFormItemProps {
  name?: string;
  isRequired?: boolean;
  className?: string;
  validate?: () => void;
}
interface IFormTextInputProps extends IFormItemProps {
  isEmail?: boolean;
  label?: string;
}
export const FormTextInput: React.FC<IFormTextInputProps> = ({
  label,
  className
}) => {
  const [text, setText] = useState();
  return (
    <TextInput
      label={label}
      onChange={e => setText(e.target.value)}
      className={className}
    />
  );
};
interface IFormPasswordInputProps extends IFormItemProps {
  label?: string;
}
export const FormPasswordInput: React.FC<IFormPasswordInputProps> = ({
  label,
  className
}) => {
  const [text, setText] = useState();
  return (
    <TextInput
      label={label}
      type="password"
      onChange={e => setText(e.target.value)}
      className={className}
    />
  );
};
export default withStyles(stylesheet)(Form);
