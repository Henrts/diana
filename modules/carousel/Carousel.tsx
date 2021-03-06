/* eslint-disable no-param-reassign */
import React, { useState, useMemo, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { WithStylesProps, Theme, ThemeStyleSheetFactory, BaseStylesheet } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useInfiniteScrollList, useIsMobile } from "@diana-ui/hooks";
import { Icon, IconNames } from "@diana-ui/icon";

// #region Interfaces

export interface ICarouselProps {
  /**
   * List of JSX.Elements items
   * to be rendered
   */
  children: JSX.Element[];
  /**
   * Header section for the component
   */
  header?: () => JSX.Element;
  /**
   * Footer section for the component
   */
  footer?: (data: {
    scrollableElement?: React.RefObject<HTMLDivElement>;
    currentScroll?: number;
    childrenSize?: number;
    centeredItemInd?: number;
    scroll: (rightDir: boolean) => void;
  }) => JSX.Element;
  /**
   * Ref for the scroll element
   */
  scrollableElementRef?: React.RefObject<HTMLDivElement>;
  /**
   * If it should have arrows controlling the carousel scroll
   */
  showScrollArrows?: boolean;
  /**
   * Tells how much margin should be used in between items
   */
  marginBetweenItems?: number;
  /**
   * Tells if virtualization should be used to render
   * the component items
   * * default value: true
   */
  useVirtualization?: boolean;
  /**
   * left Icon name.
   * usually arrow ('chevron-left')
   */
  leftIcon?: string;
  /**
   * right Icon name.
   * usually arrow ('chevron-right')
   */
  rightIcon?: string;
  /**
   * Percentage of not visible element's body
   * that makes scroll skip to another element
   * number between 0 - 1;
   * defaults to 0.3
   */
  notVisiblePercentageToSkipElement?: number;
  /**
   * Sets the wanted alignmentType
   * "normal" will align the items to the
   *      left/right
   * "centered" will focus 1 element on the center
   *      of the parent component
   */
  alignmentType?: "centered" | "normal";
  /**
   * if wheel/touch scroll is disabled
   */
  blockScroll?: boolean;
  /**
   * if alignmentType="centered" this tells on which element
   * to begin the scroll on
   */
  centeredItemIndex?: number;
  /**
   * if should animate on scroll
   * default to true
   */
  animateScroll?: boolean;
  /**
   * if true it'll darken furthest items
   * from the center
   * Default: true
   */
  darkenFurthestItems?: boolean;
  /**
   * if true it'll try to center an item
   * when scroll is untouched for 300ms
   * Default: true
   */
  autoFocus?: boolean;
}

export interface ICarouselStyles {
  /**
   * Styles the div wrapper
   */
  wrapper?: BaseStylesheet;
  /**
   * Carousel body styles (include arrows)
   */
  body?: BaseStylesheet;
  /**
   * Applied on body when with arrows
   */
  bodyWithArrows?: BaseStylesheet;
  /**
   * Styles the scrollable element
   */
  scrollableElement?: BaseStylesheet;
  /**
   * Styles each arrow container (left | right)
   */
  arrowsContainer?: BaseStylesheet;
}

// #endregion

const styleSheet: ThemeStyleSheetFactory<Theme, ICarouselStyles> = theme => ({
  wrapper: {},
  scrollableElement: {
    display: "grid",
    gridAutoFlow: "column",
    overflowY: "hidden",
    overflowX: "auto",
    scrollbarWidth: "none",
    scrollBehavior: "smooth",
    "-ms-overflow-style": "none",
    "@selectors": {
      "&::-webkit-scrollbar": {
        width: "0 !important",
        height: "0 !important"
      },
      "&:focus": {
        outline: "none"
      }
    }
  }
});

const dragVariables = {
  startx: 0,
  diffx: 0,
  drag: false
};

const addEvent = (name: string, el: any, func: any) => {
  if (el.addEventListener) {
    el.addEventListener(name, func, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${name}`, func);
  } else {
    el[name] = func;
  }
};

const onMouseUp = (scrollElement: any) => {
  if (!scrollElement) {
    return;
  }

  if (dragVariables.drag) {
    let start = 1;
    const animate: any = () => {
      const step = Math.sin(start);
      if (step <= 0) {
        window.cancelAnimationFrame(animate);
      } else {
        scrollElement.scrollLeft += dragVariables.diffx * step;
        start -= 0.02;
        window.requestAnimationFrame(animate);
      }
    };
    dragVariables.drag = false;
    animate();
    scrollElement.style.scrollBehavior = "smooth";
  }
};

const Carousel: React.FC<ICarouselProps & WithStylesProps<Theme, ICarouselStyles>> = ({
  cx,
  styles,
  children,
  header,
  footer,
  showScrollArrows = true,
  scrollableElementRef,
  marginBetweenItems = 0,
  useVirtualization = true,
  rightIcon = "chevron-right",
  leftIcon = "chevron-left",
  notVisiblePercentageToSkipElement = 0.3,
  alignmentType = "normal",
  blockScroll = false,
  centeredItemIndex = 0,
  animateScroll = true,
  darkenFurthestItems = true,
  autoFocus = true
}) => {
  const isMobile = useIsMobile();
  const [elem, setElem] = useState<React.RefObject<HTMLDivElement> | undefined>();
  const [scrollBaseReference, setScrollBaseReference] = useState<number>(0);
  const [centeredItemInd, setCenteredItemInd] = useState(centeredItemIndex);
  const [wrapperCurrentScrollPosition, setWrapperCurrentScrollPosition] = useState(0);

  const intersectionOptions = useMemo(
    () => ({
      intersectionOptions: {
        root: document.querySelector("#root"),
        rootMargin: "0px 100px 0px 0px"
      }
    }),
    []
  );
  let items = [...children];
  if (useVirtualization && children) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    items = useInfiniteScrollList(children, intersectionOptions);
  }

  useEffect(() => {
    if (!elem && scrollableElementRef && scrollableElementRef.current) {
      setElem(scrollableElementRef);
      scrollableElementRef.current.addEventListener("scroll", () =>
        setWrapperCurrentScrollPosition(scrollableElementRef.current?.scrollLeft || 0)
      );
    }
  }, [elem, scrollableElementRef]);

  useEffect(() => {
    if (!scrollableElementRef || blockScroll) {
      return;
    }

    addEvent("mousedown", scrollableElementRef?.current, (e: MouseEvent) => {
      dragVariables.drag = true;
      dragVariables.diffx = 0;
      dragVariables.startx = e.clientX + (scrollableElementRef?.current?.scrollLeft || 0);
      if (scrollableElementRef?.current?.style) {
        scrollableElementRef.current.style.scrollBehavior = "unset";
      }
    });

    addEvent("mousemove", scrollableElementRef?.current, (e: MouseEvent) => {
      if (dragVariables.drag) {
        dragVariables.diffx =
          dragVariables.startx - (e.clientX + (scrollableElementRef?.current?.scrollLeft || 0));
        if (scrollableElementRef?.current) {
          scrollableElementRef.current.scrollLeft += dragVariables.diffx;
        }
      }
    });

    addEvent("mouseup", scrollableElementRef?.current, () =>
      onMouseUp(scrollableElementRef?.current)
    );

    addEvent("mouseleave", scrollableElementRef?.current, () =>
      onMouseUp(scrollableElementRef?.current)
    );
  }, [blockScroll, scrollableElementRef]);

  const calculateChildrenSize = useCallback<() => number>(() => {
    if (!scrollableElementRef?.current) {
      return 0;
    }

    const element = scrollableElementRef.current.children[
      alignmentType === "centered" ? 1 : 0
    ] as HTMLElement;

    return element?.offsetWidth + marginBetweenItems;
  }, [marginBetweenItems, alignmentType, scrollableElementRef]);

  const scroll = useCallback(
    (rightDir = true) => {
      if (scrollableElementRef && scrollableElementRef.current) {
        const element = scrollableElementRef.current;
        if (alignmentType === "normal") {
          const currentScroll = element.scrollLeft ?? 0;
          const scrollElementWidth = element.clientWidth || 0;
          const halfMarginBetweenItems = marginBetweenItems / 2;

          const childrenSize = calculateChildrenSize();

          const numberOfFullyVisibleCards = Math.floor(scrollElementWidth / childrenSize);
          const lastCardVisibleWidth =
            scrollElementWidth - childrenSize * numberOfFullyVisibleCards;

          let newOffset = 0;
          if (rightDir) {
            newOffset = childrenSize - lastCardVisibleWidth - halfMarginBetweenItems;

            while (currentScroll >= Math.floor(newOffset)) {
              newOffset += childrenSize;
            }

            /**
             * This 0.3 value means that if we don't see only 30% or less of the
             * last element it jumps to the next one
             */
            if (
              Math.abs(currentScroll - newOffset) <
              lastCardVisibleWidth * notVisiblePercentageToSkipElement
            ) {
              newOffset += childrenSize;
            }

            newOffset -= halfMarginBetweenItems;
          } else {
            while (currentScroll > Math.floor(newOffset)) {
              newOffset += childrenSize;
            }
            newOffset = newOffset < childrenSize ? 0 : newOffset - childrenSize;
          }
          element.scrollTo(newOffset, 0);
        } else if (alignmentType === "centered") {
          if (rightDir) {
            setCenteredItemInd(centeredItemInd + 1);
            element.scrollTo(element.scrollLeft + calculateChildrenSize(), 0);
          } else {
            setCenteredItemInd(centeredItemInd - 1);
            element.scrollTo(element.scrollLeft - calculateChildrenSize(), 0);
          }
        }
      }
    },
    [
      calculateChildrenSize,
      centeredItemInd,
      marginBetweenItems,
      notVisiblePercentageToSkipElement,
      alignmentType,
      scrollableElementRef
    ]
  );

  /**
   * This useEffect calculates the needed scroll position
   * in order for the wanted item to be centered
   * when the carousel starts
   */
  useEffect(() => {
    if (alignmentType === "centered" && scrollableElementRef?.current) {
      const element = scrollableElementRef?.current;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const childrenSize = calculateChildrenSize();

      const scrollTo =
        element.clientWidth / 2 -
        (element.clientWidth / 2 - childrenSize / 2) +
        marginBetweenItems / 2;

      setScrollBaseReference(scrollTo);

      const scrollPerItem = childrenSize;

      if (!animateScroll) {
        element.style.scrollBehavior = "unset";
      }
      element.scrollTo(scrollTo + scrollPerItem * centeredItemInd, 0);
      element.style.scrollBehavior = "smooth";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateChildrenSize, alignmentType, scrollableElementRef?.current?.clientWidth]);

  /**
   * This useEffect makes sure that after some scroll action there's
   * an item on the center.
   * This calculates if the scrollLeft where the user stop scrolling
   * is closer to the next item, or the previous one, and scroll accordingly.
   */
  useEffect(() => {
    if (alignmentType !== "centered" || !autoFocus) {
      return;
    }

    const eventListener = debounce(() => {
      if (scrollableElementRef?.current && scrollBaseReference) {
        const currentScroll = scrollableElementRef.current.scrollLeft;
        let indexScroll = scrollBaseReference;
        let indexCount = 0;
        const childrenSize = calculateChildrenSize();

        if (currentScroll < indexScroll) {
          scrollableElementRef.current.scrollLeft = indexScroll;
          setCenteredItemInd(0);
        }

        const maxPossibleScroll = indexScroll + childrenSize * (items.length - 1);
        if (currentScroll > maxPossibleScroll) {
          scrollableElementRef.current.scrollLeft = maxPossibleScroll;
          setCenteredItemInd(items.length - 1);
        }

        while (currentScroll >= indexScroll) {
          indexScroll += childrenSize;
          indexCount += 1;
        }

        const highOffset = indexScroll - currentScroll;
        const lowOffset = currentScroll - (indexScroll - childrenSize);
        let chosenOffset = indexScroll;

        if (highOffset > lowOffset) {
          chosenOffset -= childrenSize;
          indexCount -= 1;
        }

        if (chosenOffset >= scrollBaseReference && Math.abs(chosenOffset - currentScroll) > 2) {
          scrollableElementRef.current.scrollLeft = chosenOffset;
          setCenteredItemInd(indexCount);
        }
      }
    }, 300);
    // eslint-disable-next-line mdx/no-unused-expressions
    scrollableElementRef?.current?.addEventListener("scroll", eventListener);

    return () => scrollableElementRef?.current?.removeEventListener("scroll", eventListener);
  }, [
    alignmentType,
    autoFocus,
    calculateChildrenSize,
    items.length,
    scrollBaseReference,
    scrollableElementRef
  ]);

  /**
   * This useEffect darkens the elements beside the centered one.
   * As the user scrolls, this calculates how dark should be based on
   * the distance from the center to that item.
   * The furthest from the center, the darker will get
   */
  useEffect(() => {
    if (alignmentType !== "centered" || !scrollableElementRef?.current || !darkenFurthestItems) {
      return;
    }

    const element = scrollableElementRef.current;

    const darkenEffectFunc = () => {
      element.childNodes.forEach((item: any, index: number) => {
        if (index === 0 || index === element.childNodes.length - 1) {
          return;
        }

        let overlayDiv = item.querySelector(".carousel-overlay");
        if (!overlayDiv) {
          item.style.position = "relative";

          const div = document.createElement("div");
          div.className = "carousel-overlay";
          div.style.position = "absolute";
          div.style.top = "0";
          div.style.left = "0";
          div.style.right = "0";
          div.style.bottom = "0";
          item.appendChild(div);

          overlayDiv = item.querySelector(".carousel-overlay");
        }

        const offsetDiff =
          Math.abs(
            element.scrollLeft +
              element.clientWidth / 2 -
              (item.offsetLeft + calculateChildrenSize() / 2 - marginBetweenItems / 2)
          ) / element.clientWidth;
        overlayDiv.style.display = "block";
        overlayDiv.style.backgroundColor = `rgba(7, 7, 7, ${offsetDiff})`;
        item.style.borderStyle = "hidden";

        if (offsetDiff < 0.1) {
          overlayDiv.style.display = "none";
          item.style.borderStyle = "solid";
        }
      });
    };

    // eslint-disable-next-line mdx/no-unused-expressions
    scrollableElementRef?.current?.addEventListener("scroll", darkenEffectFunc);

    return () => scrollableElementRef?.current?.removeEventListener("scroll", darkenEffectFunc);
  }, [
    alignmentType,
    calculateChildrenSize,
    centeredItemInd,
    darkenFurthestItems,
    marginBetweenItems,
    scrollBaseReference,
    scrollableElementRef
  ]);

  const dummyDivWidth =
    (alignmentType === "centered" &&
      (isMobile ? window.innerWidth : scrollableElementRef?.current?.clientWidth || 0) / 2) ||
    0;

  return (
    <section className={cx(styles.wrapper, "carousel-wrapper")}>
      {header}
      <div className={cx(styles.body, showScrollArrows && styles.bodyWithArrows, "carousel-body")}>
        {showScrollArrows && (
          <div
            className={cx(styles.arrowsContainer, "carousel-arrows", "carousel-arrow-left")}
            onClick={() => scroll(false)}
          >
            <Icon name={leftIcon as IconNames} />
          </div>
        )}
        <div
          ref={scrollableElementRef}
          className={cx(styles.scrollableElement, "carousel-scrollable-element")}
          style={{
            gridColumnGap: marginBetweenItems,
            ...(blockScroll ? { overflowX: "hidden" } : {})
          }}
        >
          {alignmentType === "centered" && <div style={{ width: dummyDivWidth }} />}
          {items}
          {alignmentType === "centered" && <div style={{ width: dummyDivWidth }} />}
        </div>
        {showScrollArrows && (
          <div
            className={cx(styles.arrowsContainer, "carousel-arrows", "carousel-arrow-right")}
            onClick={scroll}
          >
            <Icon name={rightIcon as IconNames} />
          </div>
        )}
      </div>
      {footer &&
        footer({
          scrollableElement: scrollableElementRef,
          currentScroll: wrapperCurrentScrollPosition,
          childrenSize: calculateChildrenSize(),
          centeredItemInd,
          scroll
        })}
    </section>
  );
};

Carousel.displayName = "Carousel";

export default withStyles(styleSheet)(Carousel);
