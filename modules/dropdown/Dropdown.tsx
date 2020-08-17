import React, { PropsWithChildren, useMemo, useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Popover, IPopoverProps, usePopoverRef } from "@diana-ui/popover";

export interface IItem {
  disabled?: boolean;
  id: string;
  text: string;
}

export interface IProps<T extends IItem> extends PropsWithChildren<IPopoverProps> {
  items: T[];
  label?: string;
  text?: string;
  placeholder?: string;
}

export interface IRenderItem<T extends IItem> {
  renderItem?: (item: T, selected: boolean, index?: number) => React.ReactNode;
}

export interface ISingleProps<T extends IItem> extends IProps<T>, IRenderItem<T> {
  onItemSelected: (item: T) => void;
  selectedItem?: T;
}

export const styleSheet: ThemeStyleSheetFactory = () => ({
  header: {
    padding: "10px 0"
  },
  item: {
    cursor: "pointer",
    "@selectors": {
      "&.disabled": {
        cursor: "default",
        pointerEvents: "none"
      },
      "&.selected": {}
    }
  },
  itemText: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  label: {
    padding: "10px 0"
  },
  list: {
    listStyle: "none",
    marginBottom: 0,
    marginTop: 0,
    maxHeight: 300,
    overflowY: "auto",
    paddingLeft: 0,
    width: "100%"
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  wrapper: {
    display: "flex",
    alignItems: "flex-start"
  }
});

export const styleSheetPopover: ThemeStyleSheetFactory = () => ({
  container: {
    maxWidth: "100%",
    minWidth: 220
  }
});

const StyledPopover = Popover.extendStyles(styleSheetPopover);

export const DropdownHeader: React.FC<{ text?: string } & WithStylesProps> = ({
  text,
  cx,
  styles
}) => (
  <div className={cx(styles.header)}>
    <div className={cx(styles.text)}>{text}</div>
  </div>
);

const BaseDropdown: React.FC<PropsWithChildren<ISingleProps<IItem> & WithStylesProps>> = props => {
  const {
    className,
    disabled,
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
  const isEmpty = useMemo(() => items.length === 0, [items.length]);

  const hide = () => ref.current?.hide();

  const renderCustomHeader = useMemo(
    () =>
      renderHeader ||
      (() => (
        <DropdownHeader
          text={text ?? (selectedItem ? selectedItem.text : placeholder)}
          cx={cx}
          styles={styles}
        />
      )),
    [cx, placeholder, renderHeader, selectedItem, styles, text]
  );

  return (
    <div className={cx("diana-dropdown", styles.wrapper, isEmpty && "empty", className)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <StyledPopover
        {...props}
        disabled={disabled ?? items.length === 0}
        renderHeader={renderCustomHeader}
        useParentWidth
        wrappedRef={ref}
      >
        {!isEmpty && (
          <ul className={cx(styles.list, "list")}>
            {items.map((item, index) => (
              <li
                className={cx(
                  styles.item,
                  selectedItem?.id === item.id && "selected",
                  item.disabled && "disabled"
                )}
                key={item.id}
                onClick={() => {
                  if (!item.disabled) {
                    onItemSelected(item);
                    hide();
                  }
                }}
                role="presentation"
                title={item.text}
              >
                {renderItem?.(
                  item,
                  selectedItem !== undefined && selectedItem.id === item.id,
                  index
                ) ?? <span className={cx(styles.itemText)}>{item.text}</span>}
              </li>
            ))}
          </ul>
        )}
      </StyledPopover>
    </div>
  );
};

BaseDropdown.displayName = "Dropdown";

export const Dropdown = withStyles(styleSheet, { register: true })(BaseDropdown);
export default Dropdown;
