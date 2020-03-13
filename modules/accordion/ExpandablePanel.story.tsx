import React, { useState } from "react";
import ExpandablePanel from "./ExpandablePanel";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const ExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Toggle me daddy">
      <p>Just how I like it</p>
    </ExpandablePanel>
  );
};
