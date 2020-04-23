import React, { useMemo, useState, useRef, useEffect } from "react";
import { withStyles } from "@diana-ui/base";
import { ChipInput } from "@diana-ui/chip";
import {
  Dropdown,
  IDropdownItem,
  ISingleDropdownProps
} from "@diana-ui/dropdown";
import { ThemeStyleSheetFactory, Theme } from "@diana-ui/types";
import { IPopoverRef } from "@diana-ui/popover";

export interface IProps extends ISingleDropdownProps<IDropdownItem> {
  onFilter?: (option: IDropdownItem, text: string) => boolean;
  inputProps?: React.ComponentProps<typeof ChipInput>;
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({});

const StyledDropdown = Dropdown.extendStyles(stylesheet);

const defaultFilter = (option: IDropdownItem, text: string) =>
  option.text.toLowerCase().includes(text.toLowerCase());

function BaseSelect(propsT: IProps) {
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

  const ref = useRef<IPopoverRef>();

  return (
    <StyledDropdown
      wrappedRef={ref}
      items={filteredItems}
      renderHeader={() => (
        <ChipInput
          {...inputProps}
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
      onItemSelected={item => {
        setValues([item.text]);
        props.onItemSelected(item);
      }}
    />
  );
}

export const Select = withStyles(stylesheet)(BaseSelect);
export default Select;
