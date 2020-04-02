import React, {
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  RefObject,
  useMemo
} from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Popover, IPopoverRef, IPopoverProps } from "@diana-ui/popover";

export interface IItem {
  id: string;
  text: string;
}

export interface IProps<T extends IItem>
  extends PropsWithChildren<IPopoverProps> {
  items: T[];
  label?: string;
  text?: string;
  placeholder?: string;
}

export interface IRenderItem<T extends IItem> {
  renderItem?: (item: T, selected: boolean, index?: number) => React.ReactNode;
}

export interface ISingleProps<T extends IItem>
  extends IProps<T>,
    IRenderItem<T> {
  onItemSelected: (item: T) => void;
  selectedItem?: T;
}

export const styleSheet: ThemeStyleSheetFactory = () => ({
  header: {
    padding: "10px 0"
  },
  item: {
    cursor: "pointer"
  },
  itemSelected: {},
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
    paddingLeft: 0
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

export const usePopoverRef = (
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

export const DropdownHeader: React.FC<{ text?: string } & WithStylesProps> = ({
  text,
  cx,
  styles
}) => (
  <div className={cx(styles.header)}>
    <div className={cx(styles.text)}>{text}</div>
  </div>
);

const BaseDropdown: React.FC<PropsWithChildren<
  ISingleProps<IItem> & WithStylesProps
>> = props => {
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
    <div className={cx(styles.wrapper, className)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <StyledPopover
        {...props}
        disabled={disabled || items.length === 0}
        renderHeader={renderCustomHeader}
        useParentWidth
        wrappedRef={ref}
      >
        <ul className={cx(styles.list, "list")}>
          {items.map((item, index) => (
            <li
              className={cx(
                styles.item,
                selectedItem?.id === item.id ? styles.itemSelected : {}
              )}
              key={item.id}
              onClick={() => {
                onItemSelected(item);
                hide();
              }}
              role="presentation"
            >
              {renderItem?.(
                item,
                selectedItem !== undefined && selectedItem.id === item.id,
                index
              ) ?? <span className={cx(styles.itemText)}>{item.text}</span>}
            </li>
          ))}
        </ul>
      </StyledPopover>
    </div>
  );
};

export const Dropdown = withStyles(styleSheet)(BaseDropdown);
export default Dropdown;
