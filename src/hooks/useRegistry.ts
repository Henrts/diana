import { useMemo } from "react";
import { ThemeStyleSheetFactory } from "../types";
import { ComponentRegistry } from "../base";
import { IProps as BaseChipProps } from "../modules/Chip/BaseChip";

export function useRegistry<T>(
  componentRegistryId: string
) {
  return useMemo(() => ComponentRegistry.get<T>(componentRegistryId), [componentRegistryId]);
}


export function useRegistryWithStyles<T>(
  componentRegistryId: string,
  styleSheet: ThemeStyleSheetFactory
) {
  return useMemo(() => {
    const component = ComponentRegistry.get<BaseChipProps>(componentRegistryId);
    if (styleSheet) {
      return component.extendStyles(styleSheet);
    }
    return component;
  }, [componentRegistryId,styleSheet]);
}


export default useRegistryWithStyles;
