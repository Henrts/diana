import React from "react";
import TextInput from "./TextInput";
import { Theme } from "@diana-ui/types";

export const TextInputCustomBorder = TextInput.extendStyles(() => ({
  fieldset: {
    border: "1px solid #ccc",
    borderRadius: "5px"
  }
}));

export const TextInputErrorBorder = TextInput.extendStyles((theme: Theme) => ({
  fieldset: {
    "@selectors": {
      "&.error": {
        border: `2px solid ${theme.colors.alert.alert100}`,
        borderRadius: "5px"
      }
    }
  }
}));

export const TextInputLabelToOutside = TextInput.extendStyles((theme: Theme) => ({
  fieldset: {
    border: "2px solid #ccc"
  },
  legend: {
    "@selectors": {
      "&.active, &.focus": {
        width: 0,
        maxWidth: 0,
        padding: 0
      }
    }
  },
  label: {
    "@selectors": {
      "&.active, &.focus": {
        transform: "translate(0px, -30px)",
        ...theme.typography.label
      }
    }
  }
}));

export const TextInputStory = () => {
  return <TextInput label="label" />;
};
