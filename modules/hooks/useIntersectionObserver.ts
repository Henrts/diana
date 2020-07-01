import { useState, useEffect } from "react";
// @ts-ignore
import "intersection-observer";

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  target?: HTMLElement,
  options?: IntersectionObserverInit,
  dependencies: unknown[] = []
) {
  const [observer, setObserver] = useState<IntersectionObserver>();
  useEffect(() => {
    const newObserver = new IntersectionObserver(callback, options);
    setObserver(newObserver);
    return () => {
      newObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, options, ...dependencies]);

  useEffect(() => {
    if (observer && target) {
      observer.observe(target);
      return () => observer?.unobserve(target);
    }
  }, [observer, target]);
}

export default useIntersectionObserver;
