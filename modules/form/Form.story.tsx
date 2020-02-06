import React from "react";
import BaseForm from "./Form";
import { BaseButton } from "@diana/button";
import * as yup from "yup";
import { StyleSheetFactory, Theme } from "@diana/types";
import { useStyles } from "@diana/base";
import { Checkbox } from "@diana/checkbox";
import { ErrorTextInput } from "@diana/textinput";

const stylesheet: StyleSheetFactory<Theme> = () => ({
    form: {},
    formItem: {
        marginTop: "24px",
    },
});

export const Form = BaseForm.extendStyles(() => ({
    form: {
        "@selectors": {
            "> *": {
                marginTop: "24px",
            },
        },
    },
}));

export const FormStory: React.FC = () => {
    const [styles, cx] = useStyles(stylesheet);

    return (
        <div>
            <Form
                schema={yup.object().shape({
                    username: yup.string().required("Username is required"),
                    password: yup
                        .string()
                        .required("Password is required")
                        .min(12, "Password is too small"),
                    remember: yup.boolean(),
                })}
                onSubmit={e => console.log(e)}
            >
                <ErrorTextInput label="Username" name="username" type="text" />
                <ErrorTextInput
                    label="Password"
                    name="password"
                    type="password"
                />
                <Checkbox name="remember">Remember me</Checkbox>
                <BaseButton className={cx(styles.formItem)} type="submit">
                    Submit
                </BaseButton>
            </Form>
        </div>
    );
};
