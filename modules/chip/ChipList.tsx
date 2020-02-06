import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
} from "@diana/types";
import { withStyles } from "@diana/base";
import { IProps as ICloseableChipProps } from "./CloseableChip";
import { useRegistry } from "../hooks/useRegistry";

export interface IProps<T> extends StandardProps<"div"> {
  list: T[];
  displayFn?: (item: T) => T;
  onDismissChip?: (item: T) => void;
  onListChange?: (newList: T[]) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chipList: {
    display: "flex",
    overflowX: "auto",
  },
  chipContainer: {
    marginRight: theme.spaceUnit.xxs,
    marginTop: theme.spaceUnit.xs,
    marginBottom: theme.spaceUnit.xs,
    ":last-child": {
      marginRight: 0,
    },
  },
});

function ChipList<T>({
  styles,
  cx,
  list = [],
  displayFn = (item: T) => item,
  onDismissChip,
  onListChange,
  wrappedRef,
  parentStylesheet,
  ...props
}: IProps<T> & WithStylesProps) {
  const [_list, setList] = useState(list);
  const divRef = useRef<HTMLDivElement>(null);
  const CloseableChipStyle = useRegistry<ICloseableChipProps>("CloseableChip");

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
      if (onDismissChip) {
        onDismissChip(item);
      }
    },
    [_list, onDismissChip, onListChange],
  );

  return (
    <div className={cx(styles.chipList)} {...props} ref={divRef}>
      {_list.map((item: T, i) => (
        <div className={cx(styles.chipContainer)} key={i}>
          <CloseableChipStyle onClose={() => handleDismiss(item, i)}>
            {displayFn(item)}
          </CloseableChipStyle>
        </div>
      ))}
    </div>
  );
}
export default withStyles(styleSheet, { register: true })(ChipList);
