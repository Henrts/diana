import React, { useRef, useState } from "react";
import Checkbox, { ICheckboxRef } from "./Checkbox";

export const CheckboxStory1 = () => {
  const ref = useRef<ICheckboxRef>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Checkbox checked readOnly>
        Checked
      </Checkbox>
      <Checkbox checked={false} readOnly>
        Unchecked
      </Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled checked readOnly>
        Disabled checked
      </Checkbox>
    </div>
  );
};

export const CheckboxStory2 = () => {
  const ref = useRef<ICheckboxRef>(null);
  const [value, setValue] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Checkbox onChange={() => console.log("Was clicked")} wrappedRef={ref}>
        Default
      </Checkbox>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ marginBottom: 8 }}>
          isChecked: {value ? "true" : "false"}
        </span>
        <button
          onClick={() => {
            ref?.current?.toggle();
            setValue(!ref?.current?.isChecked);
          }}
        >
          TOGGLE CHECKBOX
        </button>
      </div>
    </div>
  );
};
