import React, { useState } from "react";
import Stepper from "./Stepper";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const StepperStory = () => {
  return <Stepper />;
};
