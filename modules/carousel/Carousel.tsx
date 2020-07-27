import React, { useState, useMemo, useCallback, useEffect } from "react";
import { WithStylesProps, Theme, ThemeStyleSheetFactory, BaseStylesheet } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useInfiniteScrollList } from "@diana-ui/hooks";
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
   * Tells the items border width
   */
  borderWidth?: number;
  /**
   * Percentage of not visible element's body
   * that makes scroll skip to another element
   * number between 0 - 1;
   * defaults to 0.3
   */
  notVisiblePercentageToSkipElement?: number;
  /**
   * Sets the wanted scroll type
   * "normal" will align the items to the
   *      left/right
   * "centered" will focus 1 element on the center
   *      of the parent component
   */
  scrollType?: "centered" | "normal";
  /**
   * if wheel/touch scroll is disabled
   */
  blockScroll?: boolean;
  /**
   * if scrollType="centered" this tells on which element
   * to begin the scroll on
   */
  startInd?: number;
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
    // eslint-disable-next-line no-param-reassign
    el[name] = func;
  }
};

const onMouseUp = (scrollElement: any) => {
  if (dragVariables.drag) {
    let start = 1;
    const animate: any = () => {
      const step = Math.sin(start);
      if (step <= 0) {
        window.cancelAnimationFrame(animate);
      } else {
        // eslint-disable-next-line no-param-reassign
        scrollElement.scrollLeft += dragVariables.diffx * step;
        start -= 0.02;
        window.requestAnimationFrame(animate);
      }
    };
    dragVariables.drag = false;
    animate();
    // eslint-disable-next-line no-param-reassign
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
  borderWidth,
  notVisiblePercentageToSkipElement = 0.3,
  scrollType = "normal",
  blockScroll = false,
  startInd = 0
}) => {
  const [elem, setElem] = useState<React.RefObject<HTMLDivElement> | undefined>();
  const [centeredItemInd, setCenteredItemInd] = useState(startInd);
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
        // eslint-disable-next-line no-param-reassign
        scrollableElementRef.current.style.scrollBehavior = "unset";
      }
    });

    addEvent("mousemove", scrollableElementRef?.current, (e: MouseEvent) => {
      if (dragVariables.drag) {
        dragVariables.diffx =
          dragVariables.startx - (e.clientX + (scrollableElementRef?.current?.scrollLeft || 0));
        if (scrollableElementRef?.current) {
          // eslint-disable-next-line no-param-reassign
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

    const element = scrollableElementRef.current.children[scrollType === "centered" ? 1 : 0];

    return (
      (element?.clientWidth || 0) +
      (borderWidth ||
        Number((element as HTMLElement)?.style?.borderLeftWidth?.replace("px", "") || 0)) +
      (borderWidth ||
        Number((element as HTMLElement)?.style?.borderRightWidth?.replace("px", "") || 0)) +
      marginBetweenItems
    );
  }, [borderWidth, marginBetweenItems, scrollType, scrollableElementRef]);

  const scroll = useCallback(
    (rightDir = true) => {
      if (scrollableElementRef && scrollableElementRef.current) {
        const element = scrollableElementRef.current;
        if (scrollType === "normal") {
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
        } else if (scrollType === "centered") {
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
      scrollType,
      scrollableElementRef
    ]
  );

  useEffect(() => {
    if (scrollType === "centered" && scrollableElementRef?.current) {
      const element = scrollableElementRef?.current;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const childrenSize = calculateChildrenSize();

      const scrollTo =
        element.clientWidth / 2 -
        (element.clientWidth / 2 - childrenSize / 2) +
        marginBetweenItems / 2;

      const scrollPerItem = element.scrollLeft + childrenSize;

      element.scrollTo(scrollTo + scrollPerItem * centeredItemInd, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateChildrenSize, scrollType, scrollableElementRef?.current?.clientWidth]);

  return (
    <section className={cx(styles.wrapper)}>
      {header}
      <div className={cx(styles.body, showScrollArrows && styles.bodyWithArrows)}>
        {showScrollArrows && (
          <div className={cx(styles.arrowsContainer)} onClick={() => scroll(false)}>
            <Icon name={leftIcon as IconNames} />
          </div>
        )}
        <div
          ref={scrollableElementRef}
          className={cx(styles.scrollableElement)}
          style={{
            gridColumnGap: marginBetweenItems,
            ...(blockScroll ? { overflowX: "hidden" } : {})
          }}
        >
          {scrollType === "centered" && (
            <div style={{ width: (scrollableElementRef?.current?.clientWidth || 0) / 2 }} />
          )}
          {items}
          {scrollType === "centered" && (
            <div style={{ width: (scrollableElementRef?.current?.clientWidth || 0) / 2 }} />
          )}
        </div>
        {showScrollArrows && (
          <div className={cx(styles.arrowsContainer)} onClick={scroll}>
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
