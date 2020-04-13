import React from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { IPopoverProps, Popover, usePopoverRef } from "@diana-ui/popover";

export interface IProps extends IPopoverProps {}

const styleSheet: ThemeStyleSheetFactory = theme => ({
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
    // maxWidth: "100%",
    // minWidth: 220
  }
});

const StyledPopover = Popover.extendStyles(styleSheetPopover);

const Menu: React.FC<IProps & WithStylesProps> = ({
  className,
  children,
  wrappedRef,
  cx,
  styles,
  renderHeader,
  parentStylesheet,
  ...props
}) => {
  const ref = usePopoverRef(wrappedRef);
  const hide = () => ref.current?.hide();

  return (
    <StyledPopover
      {...props}
      className={className}
      wrappedRef={ref}
      renderHeader={renderHeader}
    >
      <ul className={cx(styles.list, "list")}>
        {React.Children.map(children, (child, index) => {
          console.log(child);

          return React.cloneElement(child as any, {
            onClick: () => {
              const element: any = child;
              // eslint-disable-next-line mdx/no-unused-expressions
              element?.props.onClick?.();
              hide();
            }
          });
        })}
      </ul>
    </StyledPopover>
  );
};

export default withStyles(styleSheet)(Menu);
