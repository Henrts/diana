import { useMemo } from "react";
import {
  ResizeObserver as Polyfill,
  ResizeObserverEntry
} from "@juggle/resize-observer";

const ResizeObserver = (window as any).ResizeObserver || Polyfill;

export function useResizeObserver(
  callback: (entries: ResizeObserverEntry[]) => void,
  dependencies: any[]
) {
  return useMemo(() => new ResizeObserver(callback), [
    callback,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...dependencies
  ]);
}
