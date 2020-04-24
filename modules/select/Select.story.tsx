import React, { useState } from "react";
import Select from "./Select";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import { IDropdownItem } from "@diana-ui/dropdown";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

const items = [
  { id: "1", text: "Option 1" },
  { id: "2", text: "Option 2" },
  { id: "3", text: "Option 3" },
  { id: "4", text: "Option 4" },
  { id: "5", text: "Option 5 with long text" }
];

const StyledSelect = Select.extendStyles(stylesheet);

export const SelectStory = () => {
  const [selectedItem, selectItem] = useState<IDropdownItem>();
  return (
    <div style={{ padding: "24px 300px 300px 24px", backgroundColor: "white" }}>
      <StyledSelect
        inputProps={{ label: "Select Option" }}
        items={items}
        onItemSelected={selectItem}
        selectedItem={selectedItem}
      />
    </div>
  );
};
