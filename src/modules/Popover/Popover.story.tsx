import React, { useRef } from "react";
import Popover, { IHandle } from "./Popover";
export const PopoverStory = () => {
  const ref = useRef<IHandle>(null);
  return (
    <Popover
      header={
        <button
          onClick={event => {
            ref.current?.toggle();
            event.preventDefault();
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
            return false;
          }}
        >
          toggle
        </button>
      }
      direction="left"
      ref={ref}
    >
      AA
    </Popover>
  );
};
