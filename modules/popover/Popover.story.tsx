import React, { useRef } from "react";
import Popover, { IPopoverRef } from "./Popover";

export const PopoverStory = () => {
  const ref = useRef<IPopoverRef>(null);
  return (
    <Popover renderHeader={() => <button>Toggle</button>} wrappedRef={ref}>
      <span
        style={{
          padding: "16px",
          backgroundColor: "white",
          border: "1px solid black"
        }}
      >
        Popover content
      </span>
    </Popover>
  );
};

export const PopoverHoverStory = () => {
  const ref = useRef<IPopoverRef>(null);

  return (
    <Popover renderHeader={() => <span>Hover</span>} showOnHover wrappedRef={ref}>
      <span
        style={{
          padding: "16px",
          backgroundColor: "white",
          border: "1px solid black"
        }}
      >
        Popover content
      </span>
    </Popover>
  );
};

export const PopoverOverlayStory = () => {
  const ref = useRef<IPopoverRef>(null);

  return (
    <Popover renderHeader={() => <span>Overlay</span>} showOverlay wrappedRef={ref}>
      <span
        style={{
          padding: "16px",
          backgroundColor: "white",
          border: "1px solid black"
        }}
      >
        Popover content
      </span>
    </Popover>
  );
};

export const PopoverDirectionsStory = () => {
  const ref = useRef<IPopoverRef>(null);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Popover renderHeader={() => <button>Toggle Bottom</button>} wrappedRef={ref}>
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
      <br />
      <br />
      <Popover
        renderHeader={() => <button>Toggle Right</button>}
        wrappedRef={ref}
        direction={"right"}
      >
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
      <br />
      <br />
      <Popover
        renderHeader={() => <button>Toggle Left</button>}
        wrappedRef={ref}
        direction={"left"}
      >
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
      <br />
      <br />
      <Popover renderHeader={() => <button>Toggle Top</button>} wrappedRef={ref} direction={"top"}>
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
      <br />
      <br />
      <Popover
        renderHeader={() => <button>Toggle Bottom Right</button>}
        wrappedRef={ref}
        direction={"bottom-right"}
      >
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
      <br />
      <br />
      <Popover
        renderHeader={() => <button>Toggle Top Right</button>}
        wrappedRef={ref}
        direction={"top-right"}
      >
        <span
          style={{
            padding: "16px",
            backgroundColor: "white",
            border: "1px solid black"
          }}
        >
          Popover content
        </span>
      </Popover>
    </div>
  );
};
