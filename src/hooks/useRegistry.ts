import { useMemo } from "react";
import { ThemeStyleSheetFactory } from "../types";
import { ComponentRegistry } from "../base";

export function useRegistry<T>(componentRegistryId: string) {
  return useMemo(() => ComponentRegistry.get<T>(componentRegistryId), [
    componentRegistryId
  ]);
}

export function useRegistryWithStyles<T>(
  componentRegistryId: string,
  styleSheet: ThemeStyleSheetFactory
) {
  return useMemo(() => {
    const component = ComponentRegistry.get<T>(componentRegistryId);
    if (styleSheet) {
      return component.extendStyles(styleSheet);
    }
    return component;
  }, [componentRegistryId, styleSheet]);
}

export default useRegistryWithStyles;
