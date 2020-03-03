import React, { useRef } from "react";
import Popover, { IPopoverRef } from "./Popover";

export const PopoverStory = () => {
  const ref = useRef<IPopoverRef>(null);
  return (
    <Popover
      renderHeader={() => (
        <button
          onClick={event => {
            ref.current?.toggle();
          }}
        >
          Toggle
        </button>
      )}
      wrappedRef={ref}
    >
      Popover content
    </Popover>
  );
};
