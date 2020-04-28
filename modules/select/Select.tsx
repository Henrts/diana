import React, { useMemo, useState, useEffect, useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import { IChipInputProps } from "@diana-ui/chip";
import { IDropdownItem, ISingleDropdownProps } from "@diana-ui/dropdown";
import { useRegistry, useRegistryWithStyles } from "@diana-ui/hooks";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IProps extends ISingleDropdownProps<IDropdownItem> {
  onFilter?: (option: IDropdownItem, text: string) => boolean;
  inputProps?: IChipInputProps;
}

const defaultFilter = (option: IDropdownItem, text: string) =>
  option.text.toLowerCase().includes(text.toLowerCase());

const InputStylesheet: ThemeStyleSheetFactory = theme => ({
  chipInput: { pointerEvents: "all" },
  input: { width: "100%" },
  fieldset: { margin: 0 },
  helperLabel: {
    position: "absolute",
    paddingTop: theme.spaceUnit.xxs,
    zIndex: 0
  }
});

const BaseSelect: React.FC<IProps & WithStylesProps> = (propsT: IProps) => {
  const { inputProps, items, selectedItem, onFilter, ...props } = propsT;
  const [value, setValue] = useState(selectedItem?.text);
  const [text, setText] = useState<string>();
  useEffect(() => {
    setValue(selectedItem?.text);
    setText("");
  }, [selectedItem]);

  const filteredItems = useMemo(
    () =>
      items.filter(item => {
        if (!text) {
          return true;
        }
        const filter = onFilter ?? defaultFilter;
        return filter(item, text ?? "");
      }),
    [items, text, onFilter]
  );

  const Dropdown = useRegistry<ISingleDropdownProps<IDropdownItem>>("Dropdown");
  const ChipInput = useRegistryWithStyles<IChipInputProps>("ChipInput", InputStylesheet);
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
        }}
        onChangeChips={newChips => {
          const newChip = newChips[0];
          const item = filteredItems.find(i => i.text === newChip);
          setValue(item?.text);
          setText("");
        }}
      />
    );
  }, [chips, filteredItems, inputProps, text]);

  return (
    <Dropdown
      disabled={chips.length > 0}
      items={filteredItems}
      renderHeader={renderInput}
      selectedItem={selectedItem}
      {...props}
      onItemSelected={(item: IDropdownItem) => {
        setValue(item.text);
        props.onItemSelected(item);
      }}
    />
  );
};

BaseSelect.displayName = "Select";
const Select = withStyles(() => ({}), { register: true })(BaseSelect);
export default Select;
