import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "../../types";
import { withStyles } from "../../base";
import { Icon } from "../Icon";

export interface ICheckboxRef {
  isChecked: boolean;
  toggle: () => void;
}

export interface IProps extends StandardProps<"input"> {
  showAsChecked?: boolean;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    outlineStyle: "none",
    userSelect: "none",
    cursor: "pointer",
    "@selectors": {
      ":hover .y-checkbox-icon:not(.icon-disabled):not(.icon-checked):not(.icon-show-as-checked)": {
        opacity: 1,
        fill: theme.colors.grey.grey100
      }
    }
  },
  checkboxText: {
    ...theme.fonts.bodyText
  },
  icon: {
    opacity: 0,
    fill: theme.colors.black,
    transition: "0.3s fill, 0.3s opacity"
  },
  iconDisabled: {
    fill: theme.colors.grey.grey100
  },
  iconChecked: {
    opacity: 1,
    fill: theme.colors.white
  },
  iconShowAsChecked: {
    opacity: 1,
    fill: theme.colors.black
  },
  iconContainer: {
    width: theme.spaceUnit.md,
    height: theme.spaceUnit.md,
    border: "1px solid",
    borderColor: theme.colors.black,
    boxSizing: "border-box",
    borderRadius: 2,
    position: "relative",
    backgroundColor: theme.colors.white,
    transition: "0.3s background-color, 0.3s border-color",
    marginRight: theme.spaceUnit.xs,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainerDisabled: {
    backgroundColor: theme.colors.grey.grey25,
    borderColor: theme.colors.grey.grey100
  },
  iconContainerChecked: {
    backgroundColor: theme.colors.black
  },
  iconContainerShowAsChecked: {}
});

const Checkbox: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  checked,
  showAsChecked,
  onChange,
  children,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { disabled } = props;
  const [checkedState, setCheckedState] = useState(!!checked);

  const iconContainerStyle = cx(
    styles.iconContainer,
    showAsChecked && styles.iconContainerShowAsChecked,
    checkedState && styles.iconContainerChecked,
    disabled && styles.iconContainerDisabled
  );
  const iconStyle = cx(
    ...["y-checkbox-icon", styles.icon],
    ...(showAsChecked
      ? ["icon-show-as-checked", styles.iconShowAsChecked]
      : []),
    ...(checkedState ? ["icon-checked", styles.iconChecked] : []),
    ...(disabled ? ["icon-disabled", styles.iconDisabled] : [])
  );

  useEffect(() => {
    setCheckedState(!!checked);
  }, [checked]);

  const handleInputChange = useCallback(
    event => {
      const newChecked = event.target.checked;

      if (checked === undefined && !disabled) {
        setCheckedState(newChecked);
      }

      if (onChange) {
        onChange(event);
      }
    },
    [onChange, checked, disabled]
  );

  const handleClick = useCallback(() => {
    const input = inputRef.current;
    return input?.click();
  }, []);

  useImperativeHandle<ICheckboxRef, ICheckboxRef>(wrappedRef, () => ({
    isChecked: checkedState,
    toggle: () => handleClick()
  }));

  return (
    <div
      className={cx(styles.container, disabled && { cursor: "initial" })}
      onClick={handleClick}
    >
      <div className={iconContainerStyle}>
        <Icon className={iconStyle} size={10} name="check" />
      </div>
      <input
        type="checkbox"
        {...props}
        onChange={handleInputChange}
        onClick={e => e.stopPropagation()}
        checked={checkedState}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <span className={cx(styles.checkboxText)}>{children}</span>
    </div>
  );
};

export default withStyles(styleSheet)(Checkbox);
