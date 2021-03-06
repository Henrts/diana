import React from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { Body } from "@diana-ui/typography";
import { withStyles } from "@diana-ui/base";

export interface IProps extends StandardProps<"div"> {
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  chip: {
    height: theme.spaceUnit.lg,
    padding: `0 ${theme.spaceUnit.xs}`,
    outlineStyle: "none",
    border: "1px solid",
    borderRadius: "4px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    borderColor: theme.colors.grey.grey50,
    justifyContent: "space-between"
  },
  text: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
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
  renderLeftIcon,
  renderRightIcon,
  children,
  className,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const { onClick } = props;
  const styleArray = cx(
    "diana-chip",
    styles.chip,
    onClick && styles.clickable,
    selected && styles.selected,
    disabled && styles.disabled,
    className
  );
  return (
    <div className={styleArray} {...props} ref={wrappedRef}>
      {renderLeftIcon && renderLeftIcon()}
      <Body className={cx(styles.text)}>{children}</Body>
      {renderRightIcon && renderRightIcon()}
    </div>
  );
};

BaseChip.displayName = "BaseChip";

export default withStyles(styleSheet, { register: true })(BaseChip);
