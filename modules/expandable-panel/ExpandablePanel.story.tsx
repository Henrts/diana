import React, { useState } from "react";
import ExpandablePanels from "./ExpandablePanels";
import ExpandablePanel from "./ExpandablePanel";

export const ExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!">
      <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
    </ExpandablePanel>
  );
};

export const DisabledExpandablePanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!" disabled>
      <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
    </ExpandablePanel>
  );
};

export const ExpandedPanelStory = () => {
  return (
    <ExpandablePanel header="Expand me!" initialExpanded>
      <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
    </ExpandablePanel>
  );
};

export const DynamicExpandedPanelStory = () => {
  const [numElements, setNumElements] = useState(1);

  const handleContentAdd = () => {
    setNumElements(numElements + 1);
  };

  const handleContentRemove = () => {
    if (numElements > 0) {
      setNumElements(numElements - 1);
    }
  };

  return (
    <ExpandablePanel header="Expand me!" initialExpanded>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <button onClick={handleContentAdd} style={{ marginRight: "32px" }}>
            Add content
          </button>
          <button onClick={handleContentRemove}>Remove content</button>
        </div>
        {[...Array(numElements)].map((_, i) => (
          <span key={i} style={{ padding: "32px", border: "1px solid black" }}>
            This is a dom element
          </span>
        ))}
      </div>
    </ExpandablePanel>
  );
};

export const ExpandablePanelsStory = () => {
  return (
    <ExpandablePanels>
      <ExpandablePanel header="Expand me!">
        <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <span style={{ padding: "32px", border: "1px solid black" }}>
          See? I wouldn't lie to you
        </span>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const DisabledExpandablePanelsStory = () => {
  return (
    <ExpandablePanels disabled>
      <ExpandablePanel header="Expand me!">
        <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <span style={{ padding: "32px", border: "1px solid black" }}>
          See? I wouldn't lie to you
        </span>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const ExpandedPanelsStory = () => {
  return (
    <ExpandablePanels initialExpandedPanelIndex={0}>
      <ExpandablePanel header="Expand me!">
        <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
      </ExpandablePanel>
      <ExpandablePanel initialExpanded header="You can expand me too">
        <span style={{ padding: "32px", border: "1px solid black" }}>
          See? I wouldn't lie to you
        </span>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};

export const AccordionStory = () => {
  return (
    <ExpandablePanels allowMultipleExpandedPanels={false}>
      <ExpandablePanel header="Expand me!">
        <span style={{ padding: "32px", border: "1px solid black" }}>I have been expanded!</span>
      </ExpandablePanel>
      <ExpandablePanel header="You can expand me too">
        <span style={{ padding: "32px", border: "1px solid black" }}>
          See? I wouldn't lie to you
        </span>
      </ExpandablePanel>
    </ExpandablePanels>
  );
};
