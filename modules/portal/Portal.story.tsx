import React, { useRef, useState } from "react";
import Portal from "./Portal";

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
