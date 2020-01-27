import React, { useState } from "react";
import Form, { FormTextInput, FormPasswordInput } from "./Form";
import { BaseButton } from "../Button";
import { StyleSheetFactory, Theme } from "../../types";
import { useStyles } from "../../base";
import { Checkbox } from "../Checkbox";

const stylesheet: StyleSheetFactory<Theme> = () => ({
  form: {},
  formItem: {
    marginTop: "24px"
  }
});
export const FormStory: React.FC = () => {
  const [styles, cx] = useStyles(stylesheet);
  const [submitText, setSubmitText] = useState();

  return (
    <div>
      {submitText && <span>{submitText}</span>}
      <Form>
        <FormTextInput
          className={cx(styles.formItem)}
          label="Username"
          name="username"
          isRequired
          isEmail
        />
        <FormPasswordInput
          className={cx(styles.formItem)}
          label="Password"
          name="password"
          isRequired
        />
        <Checkbox>Remember me</Checkbox>
        <BaseButton className={cx(styles.formItem)} type="submit">
          Submit
        </BaseButton>
      </Form>
    </div>
  );
};
