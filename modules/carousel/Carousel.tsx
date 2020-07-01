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
  footer?: (
    scrollableElement?: React.RefObject<HTMLDivElement>,
    currentScroll?: number
  ) => JSX.Element;
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
  borderWidth
}) => {
  const [elem, setElem] = useState<React.RefObject<HTMLDivElement> | undefined>();
  const [testCurrentScroll, setTestCurrentScroll] = useState(0);

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
        setTestCurrentScroll(scrollableElementRef.current?.scrollLeft || 0)
      );
    }
  }, [elem, scrollableElementRef]);

  useEffect(() => {
    if (!scrollableElementRef) {
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
  }, [scrollableElementRef]);

  const calculateChildrenSize = useCallback<() => number>(() => {
    if (!scrollableElementRef?.current) {
      return 0;
    }

    const element: HTMLElement = scrollableElementRef.current;

    return (
      (element.children[0]?.clientWidth || 0) +
      (borderWidth ||
        Number(
          (element.children[0] as HTMLElement)?.style?.borderLeftWidth?.replace("px", "") || 0
        )) +
      (borderWidth ||
        Number(
          (element.children[0] as HTMLElement)?.style?.borderRightWidth?.replace("px", "") || 0
        )) +
      marginBetweenItems
    );
  }, [borderWidth, marginBetweenItems, scrollableElementRef]);

  const scroll = useCallback(
    (rightDir = true) => {
      if (scrollableElementRef && scrollableElementRef.current) {
        const element = scrollableElementRef.current;
        const currentScroll = element.scrollLeft ?? 0;
        const scrollElementWidth = element.clientWidth || 0;
        const halfMarginBetweenItems = marginBetweenItems / 2;

        const childrenSize = calculateChildrenSize();

        const numberOfFullyVisibleCards = Math.floor(scrollElementWidth / childrenSize);
        const lastCardVisibleWidth = scrollElementWidth - childrenSize * numberOfFullyVisibleCards;

        let newOffset = 0;
        if (rightDir) {
          newOffset = childrenSize - lastCardVisibleWidth - halfMarginBetweenItems;

          while (currentScroll >= Math.floor(newOffset)) {
            newOffset += childrenSize;
          }
        } else {
          while (currentScroll > Math.floor(newOffset)) {
            newOffset += childrenSize;
          }
          newOffset = newOffset < childrenSize ? 0 : newOffset - childrenSize;
        }
        element.scrollTo(newOffset, 0);
      }
    },
    [calculateChildrenSize, marginBetweenItems, scrollableElementRef]
  );

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
          style={{ gridColumnGap: marginBetweenItems }}
        >
          {items}
        </div>
        {showScrollArrows && (
          <div className={cx(styles.arrowsContainer)} onClick={scroll}>
            <Icon name={rightIcon as IconNames} />
          </div>
        )}
      </div>
      {footer && footer(elem, testCurrentScroll)}
    </section>
  );
};

Carousel.displayName = "Carousel";

export default withStyles(styleSheet)(Carousel);
