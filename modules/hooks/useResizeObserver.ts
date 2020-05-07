import { useMemo } from "react";
import { ResizeObserver as Polyfill, ResizeObserverEntry } from "@juggle/resize-observer";

const ResizeObserver = (window as any).ResizeObserver || Polyfill;

export function useResizeObserver(
  callback: (entries: ResizeObserverEntry[]) => void,
  dependencies: unknown[]
) {
  return useMemo(
    () =>
      new ResizeObserver((entries: ResizeObserverEntry[]) => {
        // avoid ResizeObserver loop limit exceeded error
        window.requestAnimationFrame(() => {
          if (Array.isArray(entries) && entries.length) {
            callback(entries);
          }
        });
      }),
    [
      callback,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...dependencies
    ]
  );
}
