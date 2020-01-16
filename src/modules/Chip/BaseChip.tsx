import React from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { DescriptionMedium } from "../Typography/Typography";
import { withStyles } from "../../base";

export interface IProps extends StandardProps<"div"> {
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chip: {
    padding: theme.spaceUnit.xs,
    outlineStyle: "none",
    border: "1px solid",
    borderRadius: "4px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    borderColor: theme.colors.grey.grey50
  },
  text: {},
  selected: {
    backgroundColor: theme.colors.grey.grey100
  },
  clickable: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.colors.grey.grey25
    }
  },
  disabled: {
    pointerEvents: "none",
    color: theme.colors.grey.grey50
  }
});

const BaseChip: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  selected,
  disabled,
  onClick,
  renderLeftIcon,
  renderRightIcon,
  children,
  className,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const styleArray = [
    onClick && styles.clickable,
    selected && styles.selected,
    disabled && styles.disabled
  ];

  return (
    <div
      className={cx(styles.chip, ...styleArray, className)}
      {...props}
      ref={wrappedRef}
      onClick={onClick}
    >
      {renderLeftIcon && renderLeftIcon()}
      <DescriptionMedium className={cx(styles.text)}>
        {children}
      </DescriptionMedium>
      {renderRightIcon && renderRightIcon()}
    </div>
  );
};

// const ForwardedElement = React.forwardRef<
//   IProps & WithStylesProps,
//   HTMLDivElement
// >((props: any, ref) => <BaseChip wrappedRef={ref} {...props} />);
// ForwardedElement.displayName = "BaseChip";
export default withStyles(styleSheet)(BaseChip);
