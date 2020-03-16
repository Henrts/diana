import React, { useState } from "react";
import ExpandablePanels from "./ExpandablePanels";
import ExpandablePanel from "./ExpandablePanel";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

// const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const ExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Toggle me daddy">
      <p>Just how I like it</p>
    </ExpandablePanel>
  );
};

export const DisabledExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Toggle me daddy" disabled>
      <p>Just how I like it</p>
    </ExpandablePanel>
  );
};

export const ExpandedPanelStory = () => {
  return (
    <ExpandablePanel header="Toggle me daddy" initialExpanded>
      <p>Just how I like it</p>
    </ExpandablePanel>
  );
};

export const ExpandablePanelsStory = () => {
  return (
    <ExpandablePanels>
      <ExpandablePanel header="Toggle me daddy">
        <p>Just how I like it</p>
      </ExpandablePanel>
      <ExpandablePanel header="Toggle me harder">
        <p>Expanded for you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const DisabledExpandablePanelsStory = () => {
  return (
    <ExpandablePanels disabled>
      <ExpandablePanel header="Toggle me daddy">
        <p>Just how I like it</p>
      </ExpandablePanel>
      <ExpandablePanel header="Toggle me harder">
        <p>Expanded for you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const ExpandedPanelsStory = () => {
  return (
    <ExpandablePanels
      initialExpandedPanelIndex={0}
      allowMultipleExpandedPanels={false}
    >
      <ExpandablePanel header="Toggle me daddy">
        <p>Just how I like it</p>
      </ExpandablePanel>
      <ExpandablePanel initialExpanded header="Toggle me harder">
        <p>Expanded for you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const AccordionStory = () => {
  return (
    <ExpandablePanels allowMultipleExpandedPanels={false}>
      <ExpandablePanel header="Toggle me daddy">
        <p>Just how I like it</p>
      </ExpandablePanel>
      <ExpandablePanel header="Toggle me harder">
        <p>Expanded for you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};
