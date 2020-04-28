import React, { useState } from "react";
import { WithStylesProps } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import BaseMultipleDropdown, {
  IMultipleProps,
  multipleStylesheet,
  IRenderItem
} from "./BaseMultipleDropdown";
import { IItem } from "./Dropdown";

export interface ISimpleMultipleDropdownProps<T extends IItem> extends IMultipleProps<T> {}

const StylesBaseMultipleDropdown = BaseMultipleDropdown.extendStyles(multipleStylesheet);

const SimpleMultipleDropdown: React.FC<
  ISimpleMultipleDropdownProps<IItem> & WithStylesProps & IRenderItem<IItem>
> = ({ onItemsSelected, items, selectedItems, onClose, ...props }) => {
  const [draftItems, setDraftItems] = useState([...selectedItems]);
  const isAllSelected = items.length === draftItems.length;

  const onItemClicked = (item: IItem) => {
    let newItems = [...draftItems];
    const selected = newItems.find(i => i.id === item.id) !== undefined;
    if (selected) {
      newItems = newItems.filter(i => i.id !== item.id);
    } else {
      newItems.push(item);
    }
    setDraftItems(newItems);
  };
  const onAllButtonClicked = () => {
    if (isAllSelected) {
      setDraftItems([]);
    } else {
      setDraftItems([...items]);
    }
  };

  const onDropdownClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    /**
     * This dropdown has as feature be able to sort the selected items
     * And since we don't want the ui to flick while selecting/desselecting elements
     * Only on close we'll set the new `selectedItems`
     */
    onItemsSelected([...draftItems]);
  };

  const { selected, rest } = React.useMemo(() => {
    return items.reduce(
      (acc, item) => {
        if (selectedItems.filter(elem => elem.id === item.id).length > 0) {
          acc.selected.push(item);
        } else {
          acc.rest.push(item);
        }
        return acc;
      },
      {
        selected: [] as IItem[],
        rest: [] as IItem[]
      }
    );
  }, [items, selectedItems]);

  return (
    <StylesBaseMultipleDropdown
      items={[...selected, ...rest]}
      selectedItems={draftItems}
      onItemsSelected={onItemsSelected}
      onItemClicked={onItemClicked}
      onAllButtonClicked={onAllButtonClicked}
      isAllButtonChecked={isAllSelected}
      onClose={onDropdownClose}
      {...props}
    />
  );
};

export default withStyles(multipleStylesheet)(SimpleMultipleDropdown);
