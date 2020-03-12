import React, { useCallback, useEffect, useState } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { IProps as IChipListProps } from "./ChipList";

// @ts-ignore
export interface IProps extends StandardProps<"input"> {
  value: string[];
  allowDuplicates?: boolean;
  onChange?: (newList: string[]) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chipInput: {
    paddingRight: `${theme.spaceUnit.xs}`,
    paddingLeft: `${theme.spaceUnit.xs}`,
    borderRadius: 4,
    border: `1px solid ${theme.colors.grey.grey50}`,
    display: "flex",
    ":focus": {
      backgroundColor: "red"
    }
  },
  input: {
    border: 0,
    marginLeft: theme.spaceUnit.xs,
    ...theme.typography.descriptionMedium,
    flex: 1,
    minWidth: 80,
    outline: "none",
    minHeight: 40
  }
});

function ChipInput({
  styles,
  cx,
  className,
  value,
  onChange,
  allowDuplicates = false,
  wrappedRef,
  parentStylesheet,
  ...props
}: IProps & WithStylesProps) {
  const [_list, setList] = useState(value || []);
  const [inputValue, setInputValue] = useState("");

  const ChipListStyle = useRegistryWithStyles<IChipListProps<string>>(
    "ChipList",
    styleSheet
  );

  useEffect(() => {
    setList(value || []);
  }, [value]);

  const handleInput = useCallback(
    key => {
      if (key.key === "Enter" && inputValue.trim() !== "") {
        const isIncluded = _list.includes(inputValue.trim());
        if (allowDuplicates || !isIncluded) {
          const newList = _list.concat([inputValue.trim()]);
          setList(newList);

          if (onChange) {
            onChange(newList);
          }
        }
        setInputValue("");
      }
    },
    [_list, allowDuplicates, inputValue, onChange]
  );

  const handleChange = useCallback(
    newList => {
      setList(newList);
      if (onChange) {
        onChange(newList);
      }
    },
    [onChange]
  );

  return (
    <div className={cx(styles.chipInput, className)}>
      <ChipListStyle list={_list} onListChange={handleChange} />
      <input
        className={cx(styles.input)}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyPress={handleInput}
        {...props}
      />
    </div>
  );
}
export default withStyles(styleSheet)(ChipInput);
