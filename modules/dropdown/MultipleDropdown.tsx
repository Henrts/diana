import React, { PropsWithChildren, useMemo } from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { extendStyles, withStyles } from "@diana-ui/base";
import { IPopoverProps } from "@diana-ui/popover";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import {
  IItem,
  DropdownHeader,
  styleSheet,
  IProps,
  usePopoverRef
} from "./Dropdown";

export interface IMultipleProps<T extends IItem> extends IProps<T> {
  onItemsSelected: (items: T[]) => void;
  selectedItems: T[];
  selectAllText?: string;
  selectAllItem?: React.ReactNode;
}

export const styleSheetPopover: ThemeStyleSheetFactory = () => ({
  container: {
    maxWidth: "100%",
    minWidth: 220
  }
});

const BaseMultipleDropdown: React.FC<PropsWithChildren<
  IMultipleProps<IItem> & WithStylesProps
>> = props => {
  const {
    items,
    onItemsSelected,
    selectedItems,
    styles,
    cx,
    selectAllText,
    selectAllItem,
    label,
    placeholder,
    text,
    renderItem,
    renderHeader,
    wrappedRef
  } = props;

  const ref = usePopoverRef(wrappedRef);
  const StyledPopover = useRegistryWithStyles<IPopoverProps>(
    "Popover",
    styleSheetPopover
  );

  const hide = () => ref.current?.hide();

  const header = useMemo(
    () =>
      renderHeader ? (
        renderHeader()
      ) : (
        <DropdownHeader
          text={
            text ??
            (selectedItems.length
              ? selectedItems.map(i => i.text).join(", ")
              : placeholder)
          }
          cx={cx}
          styles={styles}
        />
      ),
    [renderHeader, text, selectedItems, placeholder, cx, styles]
  );

  return (
    <div className={cx(styles.wrapper)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <StyledPopover wrappedRef={ref} {...props} header={header}>
        <ul className={cx(styles.list)}>
          <li
            className={cx(
              styles.item,
              styles.itemAll,
              selectedItems.length === items.length && styles.itemSelected,
              selectedItems.length === items.length && styles.itemAllSelected
            )}
            onClick={() => {
              onItemsSelected([...items]);
              hide();
            }}
            role="presentation"
          >
            {selectAllItem ?? selectAllText}
          </li>
          {items.map((item: IItem, index: number) => (
            <li
              className={cx(
                styles.item,
                selectedItems?.find(i => i.id === item.id)
                  ? styles.itemSelected
                  : {}
              )}
              key={item.id}
              onClick={() => {
                let newItems = [...selectedItems];
                const selected =
                  newItems.find(i => i.id === item.id) !== undefined;
                if (selected) {
                  newItems = newItems.filter(i => i.id !== item.id);
                } else {
                  newItems.push(item);
                }
                onItemsSelected(newItems);
              }}
              role="presentation"
            >
              {renderItem?.(
                item,
                selectedItems.find(i => i.id === item.id) !== undefined,
                index
              ) ?? <span className={cx(styles.itemText)}>{item.text}</span>}
            </li>
          ))}
        </ul>
      </StyledPopover>
    </div>
  );
};

const multipleStylesheet: ThemeStyleSheetFactory = extendStyles(
  styleSheet,
  () => ({
    itemAll: {},
    itemAllSelected: {}
  })
);

export const MultipleDropdown = withStyles(multipleStylesheet)(
  BaseMultipleDropdown
);
export default MultipleDropdown;
