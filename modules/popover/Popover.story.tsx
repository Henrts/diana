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
    <Popover
      renderHeader={() => <span>Hover</span>}
      showOnHover
      wrappedRef={ref}
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
  );
};
