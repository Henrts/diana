import React, { useState } from "react";
import InputSpinner from "./InputSpinner";

export const InputSpinnerStory = () => {
  return <InputSpinner />;
};

export const InputSpinnerStoryWithProps = () => {
  const [value, setValue] = useState(5);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        Normal:{" "}
        <InputSpinner
          value={value}
          onChange={v => {
            setValue(v);
          }}
        />
      </div>

      <div>
        With Step(2), min(3), max(13):
        <InputSpinner
          value={value}
          min={3}
          max={13}
          step={2}
          onChange={v => {
            setValue(v);
          }}
        />
      </div>

      <div>
        Disabled:
        <InputSpinner
          value={value}
          disabled
          onChange={v => {
            setValue(v);
          }}
        />
      </div>
    </div>
  );
};
