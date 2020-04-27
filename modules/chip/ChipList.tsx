import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { IProps as ICloseableChipProps } from "./CloseableChip";

export interface IProps<T> extends StandardProps<"div"> {
  list: T[];
  displayFn?: (item: T) => T;
  onChipDismiss?: (item: T) => void;
  onChipClick?: (item: T) => void;
  onListChange?: (newList: T[]) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chipList: {
    display: "flex",
    overflowX: "auto"
  },
  chipContainer: {
    marginRight: theme.spaceUnit.xxs,
    marginTop: theme.spaceUnit.xs,
    marginBottom: theme.spaceUnit.xs,
    ":last-child": {
      marginRight: 0
    }
  },
  chip: {}
});

function ChipList<T>({
  styles,
  cx,
  className,
  list = [],
  displayFn = (item: T) => item,
  onChipDismiss,
  onChipClick,
  onListChange,
  wrappedRef,
  parentStylesheet,
  ...props
}: IProps<T> & WithStylesProps) {
  const [_list, setList] = useState(list);
  const divRef = useRef<HTMLDivElement>(null);
  const StyledCloseableChip = useRegistryWithStyles<ICloseableChipProps>(
    "CloseableChip",
    () => ({ ...styleSheet, ...parentStylesheet })
  );

  useEffect(() => {
    setList(list);
    setTimeout(() => {
      if (divRef?.current) {
        divRef.current.scrollLeft = divRef.current.scrollWidth;
      }
    });
  }, [list, onListChange]);

  const handleDismiss = useCallback(
    (item: T, index: number) => {
      const newList = _list.filter((_, i) => i !== index);
      setList(newList);
      if (onListChange) {
        onListChange(newList);
      }
      if (onChipDismiss) {
        onChipDismiss(item);
      }
    },
    [_list, onChipDismiss, onListChange]
  );

  return (
    <div className={cx(styles.chipList, className)} {...props} ref={divRef}>
      {_list.map((item: T, i) => (
        <div className={cx(styles.chipContainer)} key={i}>
          <StyledCloseableChip
            onClose={() => handleDismiss(item, i)}
            onClick={() => {
              if (onChipClick) {
                onChipClick(item);
              }
            }}
          >
            {displayFn(item)}
          </StyledCloseableChip>
        </div>
      ))}
    </div>
  );
}

export default withStyles(styleSheet, { register: true })(ChipList);
