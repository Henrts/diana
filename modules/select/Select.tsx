import React, { useMemo, useState, useEffect } from "react";
import { withStyles } from "@diana-ui/base";
import { IChipInputProps } from "@diana-ui/chip";
import { IDropdownItem, ISingleDropdownProps } from "@diana-ui/dropdown";
import { useRegistry } from "@diana-ui/hooks";

export interface IProps extends ISingleDropdownProps<IDropdownItem> {
  onFilter?: (option: IDropdownItem, text: string) => boolean;
  inputProps?: IChipInputProps;
}

const defaultFilter = (option: IDropdownItem, text: string) =>
  option.text.toLowerCase().includes(text.toLowerCase());

function Select(propsT: IProps) {
  const { inputProps, items, selectedItem, onFilter, ...props } = propsT;
  const [values, setValues] = useState(selectedItem ? [selectedItem.text] : []);
  const [text, setText] = useState<string>();
  useEffect(() => {
    setValues(selectedItem ? [selectedItem.text] : []);
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
  const ChipInput = useRegistry<IChipInputProps>("ChipInput");
  return (
    <Dropdown
      items={filteredItems}
      renderHeader={() => (
        <ChipInput
          {...inputProps}
          singleChip
          chips={values}
          value={text}
          onChange={event => setText(event.target.value)}
          onChangeChips={chips => {
            setValues(
              chips.filter(chip =>
                filteredItems.find(item => item.text === chip)
              )
            );
            setText("");
          }}
        />
      )}
      selectedItem={selectedItem}
      {...props}
      onItemSelected={(item: IDropdownItem) => {
        setValues([item.text]);
        props.onItemSelected(item);
      }}
    />
  );
}

export default withStyles(() => ({}), { register: true })(Select);
