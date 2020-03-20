import React, { useEffect, useMemo, RefObject } from "react";
import { createPortal } from "react-dom";
import { useWindowSize } from "@diana-ui/hooks";
import { StandardProps } from "@diana-ui/types";

export type Direction = "bottom" | "left" | "right" | "top";

export interface IProps extends StandardProps<"div"> {
  direction?: Direction;
  parentRef: React.RefObject<HTMLDivElement>;
  useParentWidth?: boolean;
  scrollableRootElement?: string | HTMLElement;
}

const getScrollTop = () => document.documentElement.scrollTop;

const getPortalStyles = (
  ref: React.RefObject<HTMLDivElement>,
  direction: Direction,
  useParentWidth: boolean
) => {
  const dimensions = ref.current?.getBoundingClientRect();

  let styles = "position: absolute; z-index: 100; ";

  if (useParentWidth) {
    styles += `width: ${dimensions?.width}px; `;
  }

  switch (direction) {
    case "top": {
      styles += `left: ${dimensions?.left}px; top: ${
        dimensions && dimensions?.top - dimensions?.height + getScrollTop()
      }px;`;
      break;
    }
    case "right": {
      styles += `left: ${dimensions?.right}px; top: ${
        dimensions && dimensions?.top + getScrollTop()
      }px;`;
      break;
    }
    case "bottom": {
      styles += `left: ${dimensions?.left}px; top: ${
        dimensions && dimensions?.top + dimensions?.height + getScrollTop()
      }px;`;
      break;
    }
    case "left": {
      styles += `right: ${dimensions?.right}px; top: ${
        dimensions && dimensions?.top + getScrollTop()
      }px;`;
      break;
    }
    default:
      break;
  }

  return styles;
};

const Portal: React.FC<IProps> = ({
  direction = "bottom",
  parentRef,
  useParentWidth = false,
  scrollableRootElement = "root",
  children
}) => {
  const windowSize = useWindowSize();

  const target = useMemo(() => document.createElement("div"), []);

  // If window size changes, recalculate position based on new parentRef position
  // This effect also sets the initial position
  useEffect(() => {
    const updateTargetStyle = () => {
      target.setAttribute(
        "style",
        getPortalStyles(parentRef, direction, useParentWidth)
      );
    };
    updateTargetStyle();
    if (scrollableRootElement) {
      const rootElement =
        typeof scrollableRootElement === "string"
          ? document.getElementById(scrollableRootElement)
          : scrollableRootElement;

      if (rootElement) {
        rootElement.addEventListener("scroll", updateTargetStyle);
      }

      return () =>
        rootElement?.removeEventListener("scroll", updateTargetStyle);
    }
  }, [
    direction,
    parentRef,
    scrollableRootElement,
    target,
    useParentWidth,
    windowSize
  ]);

  useEffect(() => {
    document.body.appendChild(target);

    return () => {
      target.remove();
    };
  }, [target]);

  return createPortal(children, target);
};

export default Portal;
