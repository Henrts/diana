import React, {
  useRef,
  PropsWithChildren,
  useImperativeHandle,
  RefObject,
  useMemo
} from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { IPopoverRef, IPopoverProps } from "@diana-ui/popover";
import { useRegistryWithStyles } from "@diana-ui/hooks";

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

export interface ISingleProps<T extends IItem> extends IProps<T> {
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
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 0,
    listStyle: "none",
    overflowY: "auto"
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
          text={text ?? (selectedItem ? selectedItem.text : placeholder)}
          cx={cx}
          styles={styles}
        />
      ),
    [renderHeader, text, selectedItem, placeholder, cx, styles]
  );

  return (
    <div className={cx(styles.wrapper)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <StyledPopover wrappedRef={ref} {...props} header={header}>
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
