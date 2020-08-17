import React, { useMemo, useState, useEffect, useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import * as Chip from "@diana-ui/chip";
import { IDropdownItem, ISingleDropdownProps } from "@diana-ui/dropdown";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps extends ISingleDropdownProps<IDropdownItem> {
  onFilter?: (option: IDropdownItem, text: string) => boolean;
  inputProps?: Chip.IChipInputProps;
  onTextChange?: (text?: string) => void;
  onItemSelected: (item?: IDropdownItem) => void;
  onNewValue?: (value: string) => void;
  renderNewValueItem?: (newValue: string, selected: boolean, index?: number) => JSX.Element;
}

const defaultFilter = (option: IDropdownItem, text: string) =>
  option.text.toLowerCase().includes(text.toLowerCase());

const InputStylesheet: ThemeStyleSheetFactory = theme => ({
  chipInput: { pointerEvents: "all" },
  input: {
    width: "100%",
    "@selectors": {
      ":disabled": {
        backgroundColor: "unset"
      }
    }
  },
  fieldset: {
    margin: 0,
    "@selectors": {
      "&.disabled": {
        backgroundColor: "unset"
      }
    }
  },
  helperLabel: {
    position: "absolute",
    paddingTop: theme.spaceUnit.xxs,
    zIndex: 0
  }
});

const BaseSelect: React.FC<IProps & WithStylesProps> = ({
  inputProps,
  items,
  parentStylesheet,
  selectedItem,
  styles,
  onFilter,
  onItemSelected,
  onNewValue,
  onTextChange,
  renderNewValueItem,
  ...props
}) => {
  const [value, setValue] = useState(selectedItem?.text);
  const [text, setText] = useState<string>();
  useEffect(() => {
    setValue(selectedItem?.text);
    setText("");
  }, [selectedItem]);

  useEffect(() => {
    if (onTextChange) {
      onTextChange(text);
    }
  }, [onTextChange, text]);

  const filteredItems = useMemo(
    () =>
      items.filter(item => {
        if (!text) {
          return !value;
        }
        const filter = onFilter ?? defaultFilter;
        return filter(item, text ?? "");
      }),
    [items, text, onFilter, value]
  );

  const dropdownStylesheet = useMemo(() => parentStylesheet ?? (() => ({})), [parentStylesheet]);

  const Dropdown = useRegistryWithStyles<ISingleDropdownProps<IDropdownItem>>(
    "Dropdown",
    dropdownStylesheet
  );
  const BaseChipInput = useRegistryWithStyles<Chip.IChipInputProps>("ChipInput", InputStylesheet);
  const ChipInput = useMemo(
    () => (parentStylesheet ? BaseChipInput.extendStyles(parentStylesheet) : BaseChipInput),
    [BaseChipInput, parentStylesheet]
  );
  const chips = useMemo(() => (value ? [value] : []), [value]);
  const renderInput = useCallback(() => {
    return (
      <ChipInput
        {...inputProps}
        singleChip
        chips={chips}
        value={text}
        onChange={event => {
          setText(event.target.value);
          if (inputProps?.onChange) {
            inputProps.onChange(event);
          }
        }}
        onChangeChips={newChips => {
          const newChip = newChips[0];
          const item = filteredItems.find(i => i.text === newChip);
          if (!item) {
            if (onNewValue) {
              setValue(newChip);
              onNewValue(newChip);
            } else {
              onItemSelected(undefined);
            }
          } else {
            setValue(item.text);
          }
          setText("");
        }}
        onBlur={event => {
          if (onNewValue) {
            if (text) {
              setValue(text);
              onNewValue(text);
            }
          } else {
            setText("");
          }
          if (inputProps?.onBlur) {
            inputProps.onBlur(event);
          }
        }}
      />
    );
  }, [chips, filteredItems, inputProps, text, onItemSelected, onNewValue]);

  const showNewValueItem = useMemo(
    () => Boolean(!filteredItems.length && onNewValue && text && renderNewValueItem),
    [filteredItems, onNewValue, renderNewValueItem, text]
  );

  const itemsToShow = useMemo(() => {
    if (filteredItems.length) {
      return filteredItems;
    }
    if (showNewValueItem && text) {
      return [{ id: text, text, newValue: true }];
    }
    return [];
  }, [filteredItems, showNewValueItem, text]);

  const renderNewItem = useCallback(
    (item: IDropdownItem, selected: boolean, index?: number) =>
      renderNewValueItem ? renderNewValueItem(item.text, selected, index) : undefined,
    [renderNewValueItem]
  );

  return (
    <Dropdown
      className="diana-select"
      disabled={chips.length > 0}
      items={itemsToShow}
      renderHeader={renderInput}
      selectedItem={selectedItem}
      {...props}
      onItemSelected={(item: IDropdownItem) => {
        setValue(item.text);
        onItemSelected(item);
      }}
      renderItem={showNewValueItem ? renderNewItem : props.renderItem}
    />
  );
};

BaseSelect.displayName = "Select";
const Select = withStyles(() => ({}), { register: true })(BaseSelect);
export default Select;
