import React, { useCallback, useState, useEffect, useMemo } from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { IErrorTextInputProps } from "@diana-ui/textinput";
import { IProps as IChipListProps } from "./ChipList";

export interface IProps extends IErrorTextInputProps {
  chips?: string[];
  allowDuplicates?: boolean;
  onChangeChips?: (newList: string[]) => void;
  singleChip?: boolean;
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

function ChipInput({
  styles,
  cx,
  className,
  onChangeChips,
  singleChip = false,
  allowDuplicates = false,
  wrappedRef,
  parentStylesheet,
  value,
  onChange,
  ...props
}: IProps & WithStylesProps) {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");
  const { chips: propsChips } = props;
  const [chips, setChips] = useState(props.chips ?? []);
  const [focus, setFocus] = useState(chips.length > 0);

  useEffect(() => {
    setFocus(focus || chips.length > 0);
  }, [chips, focus]);

  const inputStyleSheet: ThemeStyleSheetFactory = useMemo(
    () => theme => ({
      ...parentStylesheet?.(theme),
      prefixIcon: singleChip
        ? {
            width: "100%",
            marginRight: 0
          }
        : {}
    }),
    [parentStylesheet, singleChip]
  );

  const StyledErrorTextInput = useRegistryWithStyles<IErrorTextInputProps>(
    "ErrorTextInput",
    inputStyleSheet
  );
  const StyledChipList = useRegistryWithStyles<IChipListProps<string>>("ChipList", theme => ({
    ...styleSheet?.(theme),
    ...parentStylesheet?.(theme)
  }));

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  useEffect(() => {
    if (propsChips !== undefined) {
      setChips(propsChips);
    }
  }, [propsChips]);

  const handleChange = useCallback(
    newValue => {
      if (propsChips === undefined) {
        setChips(newValue);
      }
      return onChangeChips?.(newValue);
    },
    [propsChips, onChangeChips]
  );

  const handleInput = useCallback(
    key => {
      if (key.key === "Enter" && inputValue.trim() !== "") {
        const trimmedValue = inputValue.trim();
        const isIncluded = chips.includes(trimmedValue);
        if (allowDuplicates || !isIncluded) {
          const newList = [...chips, trimmedValue];
          handleChange(newList);
        }
        setInputValue("");
      }
    },
    [chips, allowDuplicates, inputValue, handleChange]
  );

  const handleChipClick = useCallback(
    chip => {
      const chipToRemove = chips.findIndex(item => item === chip);
      const newChips = [...chips];
      if (chipToRemove > -1) {
        newChips.splice(chipToRemove, 1);
      }
      handleChange(newChips);
      setInputValue(chip);
      if (onChange) {
        const event = { target: { value: chip } } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    },
    [chips, handleChange, onChange]
  );

  return (
    <div className={cx(styles.chipInput, className)}>
      <StyledErrorTextInput
        {...props}
        prefixIcon={
          chips?.length ? (
            <StyledChipList
              list={chips}
              onListChange={handleChange}
              onChipClick={handleChipClick}
            />
          ) : (
            undefined
          )
        }
        disabled={singleChip && !!chips.length}
        className={cx(styles.input)}
        value={inputValue}
        onFocus={e => {
          setFocus(true);
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onBlur={e => {
          setFocus(false);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        hasFocus={focus} // this is needed to keep the label on the top
        onChange={e => {
          setInputValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        onKeyPress={handleInput}
      />
    </div>
  );
}

export default withStyles(styleSheet, { register: true })(ChipInput);
