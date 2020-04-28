import React, { useState } from "react";
import { WithStylesProps } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import BaseMultipleDropdown, {
  IMultipleProps,
  multipleStylesheet,
  IRenderItem
} from "./BaseMultipleDropdown";
import { IItem } from "./Dropdown";

export interface IFilterMultipleDropDownProps<T extends IItem> extends IMultipleProps<T> {}

const StylesBaseMultipleDropdown = BaseMultipleDropdown.extendStyles(multipleStylesheet);

const FilterMultipleDropdown: React.FC<
  IFilterMultipleDropDownProps<IItem> & WithStylesProps & IRenderItem<IItem>
> = ({ onItemsSelected, items, ...props }) => {
  const [isAllButtonChecked, setIsAllButtonChecked] = useState(false);

  const onItemClicked = (item: IItem, selectedItems: IItem[]) => {
    if (isAllButtonChecked) {
      /**
       * If isAllButtonChecked is true
       * it means that when clicking on an element
       * we want to select only that element
       */
      setIsAllButtonChecked(false);
      onItemsSelected([item]);
    } else {
      let newItems = [...selectedItems];
      const selected = newItems.find(i => i.id === item.id) !== undefined;
      if (selected) {
        /**
         * In case this element is selected
         * we want to check if it's the last one
         * if so we reselect them all
         * if not we just push it to the selectedItems
         */
        newItems = newItems.filter(i => i.id !== item.id);
        if (newItems.length === 0) {
          setIsAllButtonChecked(true);
          newItems = [...items];
        }
      } else {
        newItems.push(item);
      }
      onItemsSelected(newItems);
    }
  };
  const onAllButtonClicked = () => {
    setIsAllButtonChecked(!isAllButtonChecked);
    onItemsSelected([...items]);
  };

  return (
    <StylesBaseMultipleDropdown
      items={items}
      onItemsSelected={onItemsSelected}
      isAllButtonChecked={isAllButtonChecked}
      onItemClicked={onItemClicked}
      onAllButtonClicked={onAllButtonClicked}
      {...props}
    />
  );
};

export default withStyles(multipleStylesheet)(FilterMultipleDropdown);
