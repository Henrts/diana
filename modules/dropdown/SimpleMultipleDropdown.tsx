import React from "react";
import { WithStylesProps } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import BaseMultipleDropdown, {
  IMultipleProps,
  multipleStylesheet
} from "./BaseMultipleDropdown";
import { IItem } from "./Dropdown";

export interface ISimpleMultipleDropDownProps<T extends IItem>
  extends IMultipleProps<T> {}

const StylesBaseMultipleDropdown = BaseMultipleDropdown.extendStyles(
  multipleStylesheet
);

const SimpleMultipleDropdown: React.FC<
  ISimpleMultipleDropDownProps<IItem> & WithStylesProps
> = ({ onItemsSelected, items, selectedItems, ...props }) => {
  const isAllSelected = items.length === selectedItems.length;

  const onItemClicked = (item: IItem) => {
    let newItems = [...selectedItems];
    const selected = newItems.find(i => i.id === item.id) !== undefined;
    if (selected) {
      newItems = newItems.filter(i => i.id !== item.id);
    } else {
      newItems.push(item);
    }
    onItemsSelected(newItems);
  };
  const onAllButtonClicked = () => {
    if (isAllSelected) {
      onItemsSelected([]);
    } else {
      onItemsSelected([...items]);
    }
  };

  return (
    <StylesBaseMultipleDropdown
      items={items}
      selectedItems={selectedItems}
      onItemsSelected={onItemsSelected}
      onItemClicked={onItemClicked}
      onAllButtonClicked={onAllButtonClicked}
      isAllButtonChecked={isAllSelected}
      {...props}
    />
  );
};

export default withStyles(multipleStylesheet)(SimpleMultipleDropdown);
