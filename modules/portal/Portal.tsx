import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useWindowSize } from "@diana-ui/hooks";
import { StandardProps } from "@diana-ui/types";

export type Direction = "bottom" | "left" | "right" | "top" | "bottom-right" | "top-right";

export interface IProps extends StandardProps<"div"> {
  centered?: boolean;
  direction?: Direction;
  parentRef: React.RefObject<HTMLDivElement>;
  useParentWidth?: boolean;
  overlayParent?: boolean;
  scrollableRootElement?: string | HTMLElement;
  zIndex?: number;
}

const getScrollTop = () => document.documentElement.scrollTop;

/*
 * given the current direction and the repositionDirection (i.e. to which side the element should reposition),
 * return the next direction or null if there isn't any
 */
const getNextDirection: (
  direction: Direction,
  repositionDirection: "left" | "right"
) => Direction | null = (direction, repositionDirection) => {
  switch (direction) {
    case "left": {
      return repositionDirection === "left" ? null : "bottom";
    }
    case "bottom": {
      return repositionDirection === "left" ? "left" : "bottom-right";
    }
    case "top": {
      return repositionDirection === "left" ? "left" : "top-right";
    }
    case "bottom-right": {
      return repositionDirection === "left" ? "bottom" : "right";
    }
    case "top-right": {
      return repositionDirection === "left" ? "top" : "right";
    }
    case "right": {
      return repositionDirection === "left" ? "bottom-right" : null;
    }
    default: {
      return null;
    }
  }
};

const getPortalStyles = (
  target: HTMLDivElement,
  ref: React.RefObject<HTMLDivElement>,
  direction: Direction,
  useParentWidth: boolean,
  centered: boolean,
  overlayParent: boolean,
  zIndex: number
) => {
  const dimensions = ref.current?.getBoundingClientRect();
  const targetDimensions = target.getBoundingClientRect();

  let styles = `display: flex; position: absolute; z-index: ${zIndex}; `;

  if (useParentWidth) {
    styles += `width: ${ref.current?.offsetWidth}px; `;
  }

  const centeredLeft =
    dimensions?.left && dimensions?.width
      ? Math.round(dimensions?.left + dimensions?.width / 2 - targetDimensions.width / 2)
      : targetDimensions.left;
  let repositionDirection =
    direction === "left" || direction === "top" || direction === "bottom" ? "right" : "left";

  const getPositionValues = (dir: Direction, shouldUseCentered = true) => {
    switch (dir) {
      case "top": {
        return {
          left:
            centered && shouldUseCentered && !useParentWidth ? centeredLeft : dimensions?.left ?? 0,
          top:
            (dimensions?.top || 0) -
            target.offsetHeight +
            getScrollTop() +
            (overlayParent ? dimensions?.height || 0 : 0)
        };
      }
      case "right": {
        return {
          left: (dimensions?.right || 0) - (overlayParent ? targetDimensions?.width || 0 : 0),
          top: (dimensions?.top || 0) + getScrollTop()
        };
      }
      case "bottom": {
        return {
          left:
            centered && shouldUseCentered && !useParentWidth ? centeredLeft : dimensions?.left ?? 0,
          top:
            (dimensions?.top || 0) +
            (dimensions?.height || 0) +
            getScrollTop() -
            (overlayParent ? dimensions?.height || 0 : 0)
        };
      }
      case "left": {
        return {
          left:
            (dimensions?.left || 0) -
            (targetDimensions?.width || 0) +
            (overlayParent ? targetDimensions?.width || 0 : 0),
          top: dimensions && dimensions?.top + getScrollTop()
        };
      }
      case "bottom-right": {
        return {
          left: (dimensions?.right || 0) - (targetDimensions?.width || 0),
          top:
            (dimensions?.top || 0) +
            (dimensions?.height || 0) +
            getScrollTop() -
            (overlayParent ? dimensions?.height || 0 : 0)
        };
      }
      case "top-right": {
        return {
          left: (dimensions?.right || 0) - (targetDimensions?.width || 0),
          top:
            (dimensions?.top || 0) -
            target.offsetHeight +
            getScrollTop() +
            (overlayParent ? dimensions?.height || 0 : 0)
        };
      }
      default:
        return { left: 0, top: 0 };
    }
  };

  let { left, top } = getPositionValues(direction);
  let nextDirection: Direction | null = direction;
  let hasTriedUncenteredPosition = false;

  /*
   * if the element is outside of the viewport, reposition it to the next logical direction
   * if the element is outside of the viewport in any direction, use original direction
   */
  while ((left + target.offsetWidth > window.innerWidth || left < 0) && nextDirection) {
    // if the element is centered, try positioning it with the same direction but uncentered
    if (
      !hasTriedUncenteredPosition &&
      centered &&
      (nextDirection === "top" || nextDirection === "bottom")
    ) {
      hasTriedUncenteredPosition = true;
    } else {
      nextDirection = getNextDirection(
        nextDirection as Direction,
        repositionDirection as "left" | "right"
      );
    }

    const positionValues = getPositionValues(nextDirection || direction, !nextDirection);
    left = positionValues.left;
    top = positionValues.top;

    // if element is centered, try repositioning on both sides (if first doesn't work)
    if (centered && !nextDirection && repositionDirection === "right") {
      hasTriedUncenteredPosition = false;
      repositionDirection = "left";
      nextDirection = direction;
    }
  }

  styles += `left: ${left}px; top: ${top}px;`;

  return styles;
};

const Portal: React.FC<IProps> = ({
  centered = false,
  overlayParent = false,
  direction = "bottom",
  parentRef,
  useParentWidth = false,
  scrollableRootElement = "root",
  children,
  zIndex = 100
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
        getPortalStyles(
          target,
          parentRef,
          direction,
          useParentWidth,
          centered,
          overlayParent,
          zIndex
        )
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
  }, [
    centered,
    overlayParent,
    direction,
    parentRef,
    scrollableRootElement,
    target,
    useParentWidth,
    windowSize,
    zIndex
  ]);

  return createPortal(children, target);
};

export default Portal;
