import React, {
  useMemo,
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  RefObject
} from "react";
import Popover, {
  IPopoverRef,
  IProps as IPopoverProps
} from "../Popover/Popover";
import { ThemeStyleSheetFactory, WithStylesProps } from "../..";
import { withStyles } from "../../base";
import extendStyles from "../../base/extendStyles";

export interface IItem {
  id: string;
  text: string;
  inactive?: boolean;
}

interface IProps<T extends IItem> extends PropsWithChildren<IPopoverProps> {
  items: T[];
  renderHeader?: () => React.ReactNode;
  renderItem: (item: T, selected: boolean, index?: number) => React.ReactNode;
  label?: string;
  text?: string;
  onClose?: (items: T[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

interface ISingleProps<T extends IItem> extends IProps<T> {
  onItemSelected: (item: T) => void;
  selectedItem?: T;
}

interface IMultipleProps<T extends IItem> extends IProps<T> {
  onItemsSelected: (items: T[]) => void;
  selectedItems: T[];
  selectAllText: string;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  header: {},
  label: {},
  text: {},
  list: {},
  item: {
    cursor: "pointer"
  },
  itemSelected: {}
});

const StyledPopover = Popover.extendStyles(styleSheet);

const usePopoverRef = (
  wrappedRef:
    | ((instance: IPopoverRef) => void)
    | RefObject<IPopoverRef>
    | null
    | undefined
) => {
  const ref = useRef<IPopoverRef>(null);

  useImperativeHandle<IPopoverRef, IPopoverRef>(wrappedRef, () => ({
    show: () => ref.current?.show(),
    hide: () => ref.current?.hide(),
    toggle: () => ref.current?.toggle()
  }));
  return ref;
};

const BaseDropdown: React.FC<PropsWithChildren<
  ISingleProps<IItem> & WithStylesProps
>> = props => {
  const {
    items,
    onItemSelected,
    selectedItem,
    styles,
    cx,
    label,
    placeholder,
    text,
    renderItem,
    renderHeader,
    wrappedRef
  } = props;
  const ref = usePopoverRef(wrappedRef);

  const hide = () => ref.current?.hide();

  const header = (
    <div className={cx(styles.header)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <div className={cx(styles.text)}>
        {text ?? (selectedItem ? selectedItem.text : placeholder)}
      </div>
    </div>
  );

  return (
    <StyledPopover
      wrappedRef={ref}
      {...props}
      header={renderHeader ? renderHeader() : header}
    >
      <div className={cx(styles.list)}>
        {items.map((item, index) => (
          <div
            className={cx(
              styles.item,
              selectedItem?.id === item.id ? styles.selected : {}
            )}
            key={item.id}
            onClick={() => {
              onItemSelected(item);
              hide();
            }}
          >
            {renderItem(
              item,
              selectedItem !== undefined && selectedItem.id === item.id,
              index
            )}
          </div>
        ))}
      </div>
    </StyledPopover>
  );
};

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
    label,
    placeholder,
    text,
    renderItem,
    renderHeader
  } = props;

  const header = (
    <div className={cx(styles.header)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <div className={cx(styles.text)}>
        {text ??
          (selectedItems?.length
            ? selectedItems.map(i => i.text).join(", ")
            : placeholder)}
      </div>
    </div>
  );

  return (
    <StyledPopover {...props} header={renderHeader ? renderHeader() : header}>
      <div className={cx(styles.list)}>
        <div
          className={cx(
            styles.item,
            styles.itemAll,
            selectedItems.length === items.length && styles.selected,
            selectedItems.length === items.length && styles.itemAllSelected
          )}
          onClick={() => onItemsSelected([...items])}
        >
          {selectAllText}
        </div>
        {items.map((item: IItem, index: number) => (
          <div
            className={cx(
              styles.item,
              selectedItems?.find(i => i.id === item.id) ? styles.selected : {}
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
          >
            {renderItem(
              item,
              selectedItems.find(i => i.id === item.id) !== undefined,
              index
            )}
          </div>
        ))}
      </div>
    </StyledPopover>
  );
};

const multipleStylesheet: ThemeStyleSheetFactory = extendStyles(
  styleSheet,
  () => ({
    itemAll: {},
    itemAllSelected: {}
  })
);

export const Dropdown = withStyles(styleSheet)(BaseDropdown);
export const MultipleDropdown = withStyles(multipleStylesheet)(
  BaseMultipleDropdown
);
export default Dropdown;
