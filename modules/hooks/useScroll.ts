import { useMemo, useState, useEffect } from "react";

export function useScroll(element?: Element) {
  const scrollingElement = useMemo(
    () => element || document.getElementById("root") || document.body,
    [element]
  );
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
