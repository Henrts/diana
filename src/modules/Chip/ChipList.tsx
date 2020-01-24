import React, { useCallback, useEffect, useState } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";
import CloseableChip from "./CloseableChip";

export interface IProps<T> extends StandardProps<"div"> {
  list: T[];
  displayFn?: (item: T) => string;
  onDismissChip?: (item: T) => void;
  onListChange?: (newList: T[]) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chipList: {
    display: "flex",
    flexWrap: "wrap"
  },
  chipContainer: {
    marginRight: theme.spaceUnit.xxs,
    ":last-child": {
      marginRight: 0
    }
  }
});

function ChipList<T extends string>({
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
  useEffect(() => {
    setList(list);
  }, [list]);

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
    [_list, onDismissChip, onListChange]
  );

  return (
    <div className={cx(styles.chipList)} {...props}>
      {_list.map((item: T, i) => (
        <div className={cx(styles.chipContainer)} key={i}>
          <CloseableChip onClose={() => handleDismiss(item, i)}>
            {displayFn(item)}
          </CloseableChip>
        </div>
      ))}
    </div>
  );
}
export default withStyles(styleSheet)(ChipList);
