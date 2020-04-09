import React, { useMemo } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Icon, IconNames } from "@diana-ui/icon";
import { IPopoverProps, Popover, usePopoverRef } from "@diana-ui/popover";

export interface IProps extends IPopoverProps {
  menuIcon: IconNames;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  menuIcon: {},
  list: {
    listStyle: "none",
    marginBottom: 0,
    marginTop: 0,
    maxHeight: 300,
    overflowY: "auto",
    paddingLeft: 0,
    width: "100%"
  },
  item: {
    cursor: "pointer"
  }
});

export const styleSheetPopover: ThemeStyleSheetFactory = () => ({
  container: {
    maxWidth: "100%",
    minWidth: 220
  }
});

const StyledPopover = Popover.extendStyles(styleSheetPopover);

const Menu: React.FC<IProps & WithStylesProps> = ({
  className,
  children,
  wrappedRef,
  cx,
  styles,
  menuIcon,
  parentStylesheet,
  ...props
}) => {
  const ref = usePopoverRef(wrappedRef);
  const hide = () => ref.current?.hide();

  const renderCustomHeader = useMemo(
    () => () => <Icon name={menuIcon} className={cx(styles.menuIcon)} />,
    [cx, menuIcon, styles]
  );

  return (
    <StyledPopover
      {...props}
      className={className}
      wrappedRef={ref}
      renderHeader={renderCustomHeader}
    >
      <ul className={cx(styles.list, "list")}>
        {React.Children.map(children, (item, index) => (
          <li
            className={cx(styles.item)}
            key={index}
            role="presentation"
            onClick={() => hide()}
          >
            {item}{" "}
          </li>
        ))}
      </ul>
    </StyledPopover>
  );
};

export default withStyles(styleSheet)(Menu);
