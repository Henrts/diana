import React, { useState, useCallback, useRef } from "react";
import { WithStylesProps, Theme, ThemeStyleSheetFactory, BaseStylesheet } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

export interface ICarouselProps {
  /**
   * List of items to be put into the carousel component
   */
  items: any[];
  /**
   * function to be called for each item
   * in order to render them
   */
  children: (item: any, index: number) => any;
  /**
   * Ref for the scroll element
   */
  scrollableElementRef?: React.RefObject<HTMLDivElement>;
  /**
   * if it should have arrows controlling the carousel scroll
   */
  scrollArrows?: boolean;
  /**
   * Tells how much margin should be used in between items
   */
  marginBetweenItems?: number;
}

export interface ICarouselStyles {
  /**
   * Styles the div wrapper
   */
  wrapper: BaseStylesheet;
  /**
   * Styles the scrollable element
   */
  scrollableElement: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory<Theme, ICarouselStyles> = theme => ({
  wrapper: {},
  scrollableElement: {
    display: "grid",
    gridAutoFlow: "column",
    overflowX: "auto"
  }
});

const Carousel: React.FC<ICarouselProps & WithStylesProps<Theme, ICarouselStyles>> = ({
  cx,
  styles,
  items,
  children,
  scrollArrows = true,
  scrollableElementRef,
  marginBetweenItems = 0
}) => {
  const scroll = useCallback(
    (rightDir = true) => {
      if (scrollableElementRef && scrollableElementRef.current) {
        const element = scrollableElementRef.current;
        const currentScroll = element.scrollLeft ?? 0;
        const scrollElementWidth = element.clientWidth || 0;
        const halfMarginBetweenItems = marginBetweenItems / 2;

        const sizeOfCardWithMargin =
          (element.querySelector("*")?.clientWidth || 0) +
          Number(element.querySelector("div")?.style?.borderLeftWidth?.replace("px", "") || 0) +
          halfMarginBetweenItems;

        const numberOfFullyVisibleCards = Math.floor(scrollElementWidth / sizeOfCardWithMargin);
        const lastCardVisibleWidth =
          scrollElementWidth - sizeOfCardWithMargin * numberOfFullyVisibleCards;

        let newOffset = 0;
        if (rightDir) {
          newOffset = sizeOfCardWithMargin - lastCardVisibleWidth - marginBetweenItems;

          while (currentScroll >= Math.floor(newOffset)) {
            newOffset += sizeOfCardWithMargin;
          }
        } else {
          while (currentScroll > Math.floor(newOffset)) {
            newOffset += sizeOfCardWithMargin;
          }
          newOffset = newOffset < sizeOfCardWithMargin ? 0 : newOffset - sizeOfCardWithMargin;
        }

        element.scrollTo(newOffset, 0);
      }
    },
    [marginBetweenItems, scrollableElementRef]
  );

  return (
    <section className={cx(styles.wrapper)}>
      {scrollArrows && <div onClick={() => scroll(false)}>{"<"}</div>}
      <div
        ref={scrollableElementRef}
        className={cx(styles.scrollableElement)}
        style={{ gridColumnGap: marginBetweenItems }}
      >
        {items.map(children)}
      </div>
      {scrollArrows && <div onClick={scroll}>{">"}</div>}
    </section>
  );
};

Carousel.displayName = "Carousel";

export default withStyles(styleSheet)(Carousel);
