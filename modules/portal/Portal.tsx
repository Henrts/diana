import React, { useEffect, useMemo, RefObject } from "react";
import { createPortal } from "react-dom";
import { useWindowSize } from "@diana-ui/hooks";
import { StandardProps } from "@diana-ui/types";

export type Direction = "bottom" | "left" | "right" | "top" | "bottom-right" | "top-right";

export interface IProps extends StandardProps<"div"> {
  centered?: boolean;
  direction?: Direction;
  parentRef: React.RefObject<HTMLDivElement>;
  useParentWidth?: boolean;
  scrollableRootElement?: string | HTMLElement;
}

const getScrollTop = () => document.documentElement.scrollTop;

const getPortalStyles = (
  target: HTMLDivElement,
  ref: React.RefObject<HTMLDivElement>,
  direction: Direction,
  useParentWidth: boolean,
  centered: boolean
) => {
  const dimensions = ref.current?.getBoundingClientRect();
  const targetDimensions = target.getBoundingClientRect();

  let styles = "display: flex; position: absolute; z-index: 100; ";

  if (useParentWidth) {
    styles += `width: ${ref.current?.offsetWidth}px; `;
  }

  const centeredLeft =
    dimensions?.left && dimensions?.width
      ? Math.round(dimensions?.left + dimensions?.width / 2 - targetDimensions.width / 2)
      : targetDimensions.left;

  switch (direction) {
    case "top": {
      styles += `left: ${centered && !useParentWidth ? centeredLeft : dimensions?.left}px; top: ${
        (dimensions?.top || 0) - target.offsetHeight + getScrollTop()
      }px;`;
      break;
    }
    case "right": {
      styles += `left: ${dimensions?.right}px; top: ${(dimensions?.top || 0) + getScrollTop()}px;`;
      break;
    }
    case "bottom": {
      styles += `left: ${centered && !useParentWidth ? centeredLeft : dimensions?.left}px; top: ${
        (dimensions?.top || 0) + (dimensions?.height || 0) + getScrollTop()
      }px;`;
      break;
    }
    case "left": {
      styles += `left: ${(dimensions?.left || 0) - (targetDimensions?.width || 0)}px; top: ${
        dimensions && dimensions?.top + getScrollTop()
      }px;`;
      break;
    }
    case "bottom-right": {
      styles += `left: ${(dimensions?.right || 0) - (targetDimensions?.width || 0)}px; top: ${
        (dimensions?.top || 0) + (dimensions?.height || 0) + getScrollTop()
      }px;`;
      break;
    }
    case "top-right": {
      styles += `left: ${(dimensions?.right || 0) - (targetDimensions?.width || 0)}px; top: ${
        (dimensions?.top || 0) - target.offsetHeight + getScrollTop()
      }px;`;
      break;
    }
    default:
      break;
  }

  return styles;
};

const Portal: React.FC<IProps> = ({
  centered = false,
  direction = "bottom",
  parentRef,
  useParentWidth = false,
  scrollableRootElement = "root",
  children
}) => {
  const windowSize = useWindowSize();

  const target = useMemo(() => {
    const el = document.createElement("div");
    // keep element width constant in order to prevent it from jumping around
    el.setAttribute("style", "display: flex; position: absolute;");
    el.className = "diana-portal";

    return el;
  }, []);

  useEffect(() => {
    document.body.appendChild(target);

    return () => {
      target.remove();
    };
  }, [target]);

  // If window size changes, recalculate position based on new parentRef position
  // This effect also sets the initial position
  useEffect(() => {
    const updateTargetStyle = () => {
      target.setAttribute(
        "style",
        getPortalStyles(target, parentRef, direction, useParentWidth, centered)
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

      return () => rootElement?.removeEventListener("scroll", updateTargetStyle);
    }
  }, [centered, direction, parentRef, scrollableRootElement, target, useParentWidth, windowSize]);

  return createPortal(children, target);
};

export default Portal;
