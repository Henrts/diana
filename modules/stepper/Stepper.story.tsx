import React, { useState } from "react";
import Stepper from "./Stepper";

export const StepperStory = () => {
  const [value, setValue] = useState(0);
  return <Stepper steps={6} clickable activeStep={value} onChange={v => setValue(v)} />;
};
