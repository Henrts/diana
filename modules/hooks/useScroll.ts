import { useState, useEffect } from "react";

export function useScroll(element?: Element) {
  const scrollingElement = element || document.getElementById("root") || document.body;
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(scrollingElement.scrollTop);
  const [scrollDirection, setScrollDirection] = useState<string>();
  const hasScrolledToBottom =
    scrollY + scrollingElement.clientHeight === scrollingElement.scrollHeight;

  const listener = () => {
    const { scrollTop } = scrollingElement;
    setScrollY(scrollTop);
    setScrollDirection(lastScrollTop < scrollTop ? "down" : "up");
    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    scrollingElement.addEventListener("scroll", listener);
    return () => {
      scrollingElement.removeEventListener("scroll", listener);
    };
  });

  return {
    hasScrolledToBottom,
    scrollY,
    scrollDirection,
    scrollingElement
  };
}

export default useScroll;
