import React from "react";
import ExpandablePanels from "./ExpandablePanels";
import ExpandablePanel from "./ExpandablePanel";

export const ExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!">
      <p>I have been expanded!</p>
    </ExpandablePanel>
  );
};

export const DisabledExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!" disabled>
      <p>I have been expanded!</p>
    </ExpandablePanel>
  );
};

export const ExpandedPanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!" initialExpanded>
      <p>I have been expanded!</p>
    </ExpandablePanel>
  );
};

export const ExpandablePanelsStory = () => {
  return (
    <ExpandablePanels>
      <ExpandablePanel header="Expand me!">
        <p>I have been expanded!</p>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <p>See? I wouldn't lie to you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const DisabledExpandablePanelsStory = () => {
  return (
    <ExpandablePanels disabled>
      <ExpandablePanel header="Expand me!">
        <p>I have been expanded!</p>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <p>See? I wouldn't lie to you</p>
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
      <ExpandablePanel header="Expand me!">
        <p>I have been expanded!</p>
      </ExpandablePanel>
      <ExpandablePanel initialExpanded header="You can expand me too">
        <p>See? I wouldn't lie to you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const AccordionStory = () => {
  return (
    <ExpandablePanels allowMultipleExpandedPanels={false}>
      <ExpandablePanel header="Expand me!">
        <p>I have been expanded!</p>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <p>See? I wouldn't lie to you</p>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};
