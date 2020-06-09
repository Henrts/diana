import { useState, useEffect } from "react";
// @ts-ignore
import "intersection-observer";

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  target?: JSX.Element,
  options?: IntersectionObserverInit,
  dependencies: unknown[] = []
) {
  const [observer, setObserver] = useState<IntersectionObserver>();
  useEffect(() => {
    if (observer) {
      return;
    }
    const newObserver = new IntersectionObserver(callback, options);
    setObserver(newObserver);
    return () => {
      console.log("unmounted");
      newObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, options, ...dependencies]);

  useEffect(() => {
    if (observer && target) {
      observer.observe((target as unknown) as Element);
      return () => observer?.unobserve((target as unknown) as Element);
    }
  }, [observer, target]);
}

export default useIntersectionObserver;
