import React, { useCallback, useEffect, useState } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
  StyledComponent
} from "../../types";
import { withStyles } from "../../base";
import CloseableChip, { IProps as ICloseableChipProps } from "./CloseableChip";
import ChipList, { IProps as IChipListProps } from "./ChipList";

// typescript doesnt allow to override interfaces, don't know why
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export interface IProps extends StandardProps<"input"> {
  value: string[];
  allowDuplicates?: boolean;
  onChange?: (newList: string[]) => void;
  Chip: StyledComponent<ICloseableChipProps>;
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

export const CloseableChipStyle = CloseableChip.extendStyles(styleSheet);
export const ChipListStyle = ChipList.extendStyles(styleSheet);

function ChipInput({
  styles,
  cx,
  Chip = CloseableChipStyle,
  value,
  onChange,
  allowDuplicates = false,
  wrappedRef,
  parentStylesheet,
  ...props
}: IProps & WithStylesProps) {
  const [_list, setList] = useState(value || []);
  const [inputValue, setInputValue] = useState("");

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
    <div className={cx(styles.chipInput)}>
      <ChipListStyle list={_list} onListChange={handleChange} Chip={Chip} />
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
