import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface IOptions {
  limit?: number;
  dependencies?: unknown[];
  intersectionOptions?: IntersectionObserverInit;
}

function useInfiniteScrollList(fullList: JSX.Element[], options?: IOptions) {
  const { limit = 10, dependencies = [], intersectionOptions } = useMemo(() => options ?? {}, [
    options
  ]);
  const [list, setList] = useState(fullList.slice(0, limit));
  useEffect(() => {
    setList(fullList.slice(0, limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullList, ...dependencies]);

  const ref = useRef<JSX.Element>();

  const incrementList = useCallback(() => {
    if (list.length === fullList.length) {
      return;
    }
    const newList = fullList.slice(0, list.length + limit);
    setList(newList);
  }, [list, fullList, limit]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries.pop();
      if (entry?.isIntersecting) {
        incrementList();
      }
    },
    [incrementList]
  );

  useIntersectionObserver(callback, ref.current, intersectionOptions, [ref]);

  const memoList = useMemo(
    () =>
      list.map((item, index) => {
        return index === list.length - 1 && list.length !== fullList.length
          ? React.cloneElement(item, {
              // @ts-ignore
              wrappedRef: ref
            })
          : item;
      }),
    [list, fullList]
  );
  return memoList;
}

export default useInfiniteScrollList;
