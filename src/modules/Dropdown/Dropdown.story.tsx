import React, { useState } from "react";
import Dropdown, { IItem } from "./Dropdown";
import MultipleDropdown from "./MultipleDropdown";
import { Text } from "../Typography";
import { useStyles } from "../../base";
import { ThemeStyleSheetFactory } from "../../types";

const stylesheet: ThemeStyleSheetFactory = theme => ({
  container: {
    maxWidth: 200,
    marginBottom: 200
  },
  item: {
    ":hover": {
      fontWeight: 700
    }
  },
  itemSelected: { fontWeight: 700 }
});

const items = [
  { id: "1", text: "Option 1" },
  { id: "2", text: "Option 2" },
  { id: "3", text: "Option 3" },
  { id: "4", text: "Option 4" },
  { id: "5", text: "Option 5 with long text" }
];

const StyledDropdown = Dropdown.extendStyles(stylesheet);
const StyledMultipleDropdown = MultipleDropdown.extendStyles(stylesheet);

export const DropdownStory = () => {
  const [selectedItem, selectItem] = useState();
  return (
    <StyledDropdown
      placeholder="Dropdown"
      selectedItem={selectedItem}
      onItemSelected={selectItem}
      items={items}
    />
  );
};

export const MultipleDropdownStory = () => {
  const [selectedItems, selectItems] = useState<IItem[]>([]);
  const [styles, cx] = useStyles(stylesheet);
  return (
    <StyledMultipleDropdown
      placeholder="Dropdown"
      selectAllText="Select all"
      selectedItems={selectedItems}
      onItemsSelected={selectItems}
      items={items}
      renderItem={item => <Text className={cx(styles.hover)}>{item.text}</Text>}
    />
  );
};
