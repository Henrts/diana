import React, { useRef } from "react";
import Popover, { IPopoverRef } from "./Popover";

export const PopoverStory = () => {
  const ref = useRef<IPopoverRef>(null);
  return (
    <Popover renderHeader={() => <button>Toggle</button>} wrappedRef={ref}>
      Popover content
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
      Popover content
    </Popover>
  );
};
