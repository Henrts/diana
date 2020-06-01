import React, { useState } from "react";
import Dropdown, { IItem } from "./Dropdown";
import SimpleMultipleDropdown from "./SimpleMultipleDropdown";
import FilterMultipleDropdown from "./FiltersMultipleDropdown";
import { Body } from "@diana-ui/typography";
import { useStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({
  container: {
    maxWidth: 200,
    marginBottom: 200
  },
  item: {
    ":hover": {
      fontWeight: 700
    },
    "@selectors": {
      "&.selected": { fontWeight: 700 }
    }
  }
});

const items = [
  { id: "1", text: "Option 1" },
  { id: "2", text: "Option 2 (disabled)", disabled: true },
  { id: "3", text: "Option 3" },
  { id: "4", text: "Option 4 (disabled)", disabled: true },
  { id: "5", text: "Option 5 with long text" }
];

const StyledDropdown = Dropdown.extendStyles(stylesheet);
const StyledSimpleMultipleDropdown = SimpleMultipleDropdown.extendStyles(stylesheet);
const StyledFilterMultipleDropdown = FilterMultipleDropdown.extendStyles(stylesheet);

export const DropdownStory = () => {
  const [selectedItem, selectItem] = useState<IItem>();
  return (
    <StyledDropdown
      placeholder="Dropdown"
      selectedItem={selectedItem}
      onItemSelected={selectItem}
      items={items}
    />
  );
};

export const SimpleMultipleDropdownStory = () => {
  const [selectedItems, selectItems] = useState<IItem[]>([]);
  const [styles, cx] = useStyles(stylesheet);
  return (
    <StyledSimpleMultipleDropdown
      placeholder="Multiple Dropdown"
      selectAllText="Select all"
      selectedItems={selectedItems}
      onItemsSelected={selectItems}
      items={items}
      renderItem={item => <Body className={cx(styles.hover)}>{item.text}</Body>}
    />
  );
};

export const FilterMultipleDropdownStory = () => {
  const [selectedItems, selectItems] = useState<IItem[]>([]);
  const [styles, cx] = useStyles(stylesheet);
  return (
    <StyledFilterMultipleDropdown
      placeholder="Multiple Dropdown"
      selectAllText="Select all"
      selectedItems={selectedItems}
      onItemsSelected={selectItems}
      items={items}
      renderItem={item => <Body className={cx(styles.hover)}>{item.text}</Body>}
    />
  );
};
