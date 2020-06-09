import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface IOptions {
  limit?: number;
  dependencies?: unknown[];
  intersectionOptions?: IntersectionObserverInit;
  wrappedRef?: boolean;
}

function useInfiniteScrollList(fullList: JSX.Element[], options?: IOptions) {
  const { limit = 10, dependencies = [], intersectionOptions, wrappedRef = false } = useMemo(
    () => options ?? {},
    [options]
  );
  const [list, setList] = useState(fullList.slice(0, limit));
  useEffect(() => {
    setList(fullList.slice(0, limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullList, ...dependencies]);

  const ref = useRef<JSX.Element>();

  const incrementList = useCallback(() => {
    debugger;
    if (list.length === fullList.length) {
      return;
    }
    const newList = fullList.slice(0, list.length + limit);
    setList(newList);
  }, [list, fullList, limit]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      console.log("incrementttttt");
      const entry = entries.pop();
      if (entry?.isIntersecting) {
        console.log("interseting");
        incrementList();
      }
    },
    [incrementList]
  );

  useIntersectionObserver(callback, ref.current, intersectionOptions, [ref]);

  const memoList = useMemo(
    () =>
      list.map((item, index) => {
        if (index === list.length - 1 && list.length !== fullList.length) {
          const props = wrappedRef ? { wrappedRef: ref } : { ref };
          return React.cloneElement(item, props);
        }
        return item;
      }),
    [list, fullList, wrappedRef]
  );
  return memoList;
}

export default useInfiniteScrollList;
