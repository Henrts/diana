import React, {
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  RefObject,
  useMemo
} from "react";
import { withStyles } from "@diana/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana/types";
import { IPopoverRef, IProps as IPopoverProps } from "../popover/Popover";
import useRegistryWithStyles from "../hooks/useRegistry";

export interface IItem {
  id: string;
  text: string;
}

export interface IProps<T extends IItem>
  extends PropsWithChildren<IPopoverProps> {
  items: T[];
  renderHeader?: () => React.ReactNode;
  renderItem?: (item: T, selected: boolean, index?: number) => React.ReactNode;
  label?: string;
  text?: string;
  placeholder?: string;
}

interface ISingleProps<T extends IItem> extends IProps<T> {
  onItemSelected: (item: T) => void;
  selectedItem?: T;
}

export const styleSheet: ThemeStyleSheetFactory = () => ({
  header: {},
  label: {},
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  list: {
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 0,
    listStyle: "none",
    overflowY: "auto"
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
  }
});

export const styleSheetPopover: ThemeStyleSheetFactory = () => ({
  container: {
    maxWidth: "100%"
  }
});

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

export const DropdownHeader: React.FC<
  { label?: string; text?: string } & WithStylesProps
> = ({ label, text, cx, styles }) => (
  <div className={cx(styles.header)}>
    {label && <div className={cx(styles.label)}>{label}</div>}
    <div className={cx(styles.text)}>{text}</div>
  </div>
);

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
  const StyledPopover = useRegistryWithStyles<IPopoverProps>(
    "Popover",
    styleSheetPopover
  );

  const hide = () => ref.current?.hide();

  const header = useMemo(
    () =>
      renderHeader?.() ?? (
        <DropdownHeader
          label={label}
          text={text ?? (selectedItem ? selectedItem.text : placeholder)}
          cx={cx}
          styles={styles}
        />
      ),
    [renderHeader, label, text, selectedItem, placeholder, cx, styles]
  );

  return (
    <StyledPopover wrappedRef={ref} {...props} header={header}>
      <ul className={cx(styles.list)}>
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
  );
};

export const Dropdown = withStyles(styleSheet)(BaseDropdown);
export default Dropdown;
