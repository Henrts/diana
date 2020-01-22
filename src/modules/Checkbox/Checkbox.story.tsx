import React, { useCallback, useEffect, useRef, useState } from "react";
import Checkbox, { ICheckboxRef } from "./Checkbox";

export const CheckboxStory1 = () => {
  const ref = useRef<ICheckboxRef>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
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

  // just a way of showing what is checked at the time
  const onToggle = useCallback(() => {
    setTimeout(() => {
      if (ref && ref.current) {
        setValue(ref.current.isChecked);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Checkbox onChange={() => onToggle()} wrappedRef={ref}>
        Default
      </Checkbox>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ marginBottom: 8 }}>
          isChecked: {value ? "true" : "false"}
        </span>
        <button
          onClick={() => {
            ref?.current?.toggle();
            onToggle();
          }}
        >
          TOGGLE CHECKBOX
        </button>
      </div>
    </div>
  );
};
