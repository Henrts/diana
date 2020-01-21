import React, { useRef } from "react";
import Popover, { IPopoverRef } from "./Popover";

export const PopoverStory = () => {
  const ref = useRef<IPopoverRef>(null);
  return (
    <Popover
      header={
        <button
          onClick={event => {
            ref.current?.toggle();
          }}
        >
          toggle
        </button>
      }
      wrappedRef={ref}
    />
  );
};
