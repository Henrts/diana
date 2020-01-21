import TextInput from "./TextInput";

export const SimpleTextInput = TextInput.extendStyles(() => ({
    fieldset: {
        border: "none"
    }
}));
export default SimpleTextInput;