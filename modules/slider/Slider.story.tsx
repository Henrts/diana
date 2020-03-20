import React, { useState } from "react";
import { Slider, LockedSlider } from "./";

export const SliderStory = () => {
  const [value, setValue] = useState(0);
  return (
    <Slider min={0} max={10000} value={value} step={0.1} onChange={setValue} />
  );
};

export const DisabledSliderStory = () => {
  return (
    <Slider
      disabled
      min={0}
      max={10}
      value={6}
      step={0.1}
      onChange={() => {}}
    />
  );
};

export const LockedSliderStory = () => {
  const [value, setValue] = useState(6);

  return (
    <LockedSlider
      startLocked
      lockedIcon="check"
      unlockedIcon="block"
      min={0}
      max={100}
      value={value}
      step={0.1}
      onChange={setValue}
    />
  );
};
