import React from "react";
import TextInput from "./TextInput";
import { Theme } from "../../types";

export const TextInputCustomBorder = TextInput.extendStyles(() => ({
    fieldset: {
        border: "1px solid #ccc",
        borderRadius: "5px"
    }
}))


export const TextInputErrorBorder = TextInput.extendStyles((theme: Theme) => ({
    fieldset: {
        border: "none"
    },
    fieldsetError: {
        border: `2px solid ${theme.colors.alert.alert100}`,
        borderRadius: "5px"
    }
}))

export const TextInputLabelToOutside = TextInput.extendStyles((theme: Theme) => ({
    fieldset: {
        border: "2px solid #ccc"
    },
    legendActive: {
        width: 0,
        maxWidth: 0,
        padding: 0
    },
    legendFocus: {
        width: 0,
        maxWidth: 0,
        padding: 0
    },
    legend: {
        transition: "none"
    },
    labelActive: {
        transform: "translate(0px, -30px)",
        ...theme.fonts.label,
    },
    labelFocus: {
        transform: "translate(0px, -30px)",
        ...theme.fonts.label,
    }
}));

export const TextInputStory = () => {
    return <TextInput label="label" />
}