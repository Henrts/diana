import React, { useCallback, useState, useEffect, useRef } from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { ErrorTextInput } from "@diana-ui/textinput";
import { IProps as IChipListProps } from "./ChipList";

export interface IProps extends React.ComponentProps<typeof ErrorTextInput> {
  chips: string[];
  allowDuplicates?: boolean;
  onChangeChips: (newList: string[]) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chipInput: {
    display: "flex"
  },
  input: {},
  chipList: {
    width: "100%"
  },
  chipContainer: {
    width: "100%",
    margin: 0
  },
  chip: {
    justifyContent: "space-between"
  }
});

const inputStyleSheet: ThemeStyleSheetFactory = theme => ({
  prefixIcon: {
    width: "100%",
    marginRight: 0
  }
});

const ErrorTextInputStyle = ErrorTextInput.extendStyles(inputStyleSheet);

function ChipInput({
  styles,
  cx,
  className,
  chips,
  onChangeChips,
  allowDuplicates = false,
  wrappedRef,
  parentStylesheet,
  value,
  ...props
}: IProps & WithStylesProps) {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");

  const ChipListStyle = useRegistryWithStyles<IChipListProps<string>>(
    "ChipList",
    styleSheet
  );

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  const handleInput = useCallback(
    key => {
      if (key.key === "Enter" && inputValue.trim() !== "") {
        const isIncluded = chips.includes(inputValue.trim());
        if (allowDuplicates || !isIncluded) {
          const newList = chips.concat([inputValue.trim()]);
          if (onChangeChips) {
            onChangeChips(newList);
          }
        }
        setInputValue("");
      }
    },
    [chips, allowDuplicates, inputValue, onChangeChips]
  );

  const handleChange = useCallback(
    newList => {
      if (onChangeChips) {
        onChangeChips(newList);
      }
    },
    [onChangeChips]
  );

  const handleChipClick = useCallback(
    (chip: string) => {
      handleChange(chips.filter(item => item !== chip));
      setInputValue(chip);
    },
    [chips, handleChange]
  );

  return (
    <div className={cx(styles.chipInput, className)}>
      <ErrorTextInputStyle
        {...props}
        prefixIcon={
          chips?.length ? (
            <ChipListStyle
              list={chips}
              onListChange={handleChange}
              onChipClick={handleChipClick}
            />
          ) : (
            undefined
          )
        }
        className={cx(styles.input)}
        value={chips?.length ? chips[0] : inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          if (props.onChange) props.onChange(e);
        }}
        onKeyPress={handleInput}
      />
    </div>
  );
}
export default withStyles(styleSheet)(ChipInput);
