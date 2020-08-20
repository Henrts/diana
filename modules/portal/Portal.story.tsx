import React, { useRef, useState } from "react";
import { Dropdown, IDropdownItem } from "@diana-ui/dropdown";
import { Toggle } from "@diana-ui/toggle";
import Portal, { Direction } from "./Portal";

export const PortalStory = () => {
  const [isPortalOpen, setPortalOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setPortalOpen(!isPortalOpen);
  };

  return (
    <div ref={divRef}>
      A Portal into a new dimension...
      <button onClick={onClick}>Click to teleport</button>
      {isPortalOpen && (
        <Portal parentRef={divRef}>
          <span
            style={{
              padding: "16px",
              border: "1px solid black",
              backgroundColor: "white"
            }}
          >
            This content is a hierarchical desdendant of {"<body>"}!
          </span>
        </Portal>
      )}
    </div>
  );
};

export const TopPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="top">
          Top aligned
        </Portal>
      </div>
    </div>
  );
};

export const RightPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="right">
          Right aligned
        </Portal>
      </div>
    </div>
  );
};

export const LeftPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="left">
          Left aligned
        </Portal>
      </div>
    </div>
  );
};

export const CenteredPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} centered>
          centered
        </Portal>
      </div>
    </div>
  );
};

export const BottomRightPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="bottom-right">
          Bottom right text aligned
        </Portal>
      </div>
    </div>
  );
};

export const TopRightPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="top-right">
          top right text aligned
        </Portal>
      </div>
    </div>
  );
};

export const CenterTopPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "inline-block", backgroundColor: "burlywood" }} ref={divRef}>
        Parent component
        <Portal parentRef={divRef} direction="top" centered>
          center top text aligned
        </Portal>
      </div>
    </div>
  );
};

export const OverflowPortalStory = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<IDropdownItem>({ id: "top", text: "top" });
  const [isCentered, setIsCentered] = useState<boolean>(true);
  const directions = [
    { id: "top", text: "top" },
    { id: "top-right", text: "top-right" },
    { id: "left", text: "left" },
    { id: "bottom", text: "bottom" },
    { id: "bottom-right", text: "bottom-right" },
    { id: "right", text: "right" }
  ];

  console.log("isCentered", isCentered);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "burlywood",
          width: "fit-content",
          alignSelf: "flex-start"
        }}
        ref={divRef}
      >
        Parent component
        <Portal parentRef={divRef} direction={direction?.id as Direction} centered={isCentered}>
          <div style={{ width: "300px" }}>
            I will always be partially hidden if placed on the left!
          </div>
        </Portal>
      </div>
      <div style={{ display: "flex", alignSelf: "center", marginTop: "48px" }}>
        <Dropdown
          label="choose direction: "
          items={directions}
          selectedItem={direction}
          onItemSelected={setDirection}
        />
        <Toggle
          checked={isCentered}
          onChange={() => setIsCentered(currentIsCentered => !currentIsCentered)}
        >
          isCentered
        </Toggle>
      </div>
    </div>
  );
};
