import React, { useState } from "react";
import Collapsable from "./Collapsable";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const CollapsableStory = () => {
  return <Collapsable />;
};
