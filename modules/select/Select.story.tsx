import React, { useState } from "react";
import Select from "./Select";
import { IDropdownItem } from "@diana-ui/dropdown";

const items = [
  { id: "1", text: "Option 1" },
  { id: "2", text: "Option 2" },
  { id: "3", text: "Option 3" },
  { id: "4", text: "Option 4" },
  { id: "5", text: "Option 5 with long text that needs overflow" }
];

export const SelectStory = () => {
  const [selectedItem, selectItem] = useState<IDropdownItem>();

  return (
    <div style={{ width: 220, padding: "24px 300px 300px 24px", backgroundColor: "white" }}>
      <Select
        inputProps={{ label: "Select Option" }}
        items={items}
        onItemSelected={item => {
          console.log(item);
          selectItem(item);
        }}
        selectedItem={selectedItem}
      />
    </div>
  );
};
