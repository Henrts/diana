import React, { useMemo, useState, useEffect } from "react";
import { withStyles } from "@diana-ui/base";
import { IChipInputProps } from "@diana-ui/chip";
import { IDropdownItem, ISingleDropdownProps } from "@diana-ui/dropdown";
import { useRegistry, useRegistryWithStyles } from "@diana-ui/hooks";

export interface IProps extends ISingleDropdownProps<IDropdownItem> {
  onFilter?: (option: IDropdownItem, text: string) => boolean;
  inputProps?: IChipInputProps;
}

const defaultFilter = (option: IDropdownItem, text: string) =>
  option.text.toLowerCase().includes(text.toLowerCase());

function Select(propsT: IProps) {
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
  const ChipInput = useRegistryWithStyles<IChipInputProps>("ChipInput", () => ({
    chipInput: { pointerEvents: "all" }
  }));
  const chips = useMemo(() => (value ? [value] : []), [value]);
  return (
    <Dropdown
      disabled={chips.length > 0}
      items={filteredItems}
      renderHeader={() => (
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
      )}
      selectedItem={selectedItem}
      {...props}
      onItemSelected={(item: IDropdownItem) => {
        setValue(item.text);
        props.onItemSelected(item);
      }}
    />
  );
}

export default withStyles(() => ({}), { register: true })(Select);
