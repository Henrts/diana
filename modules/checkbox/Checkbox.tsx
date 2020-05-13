import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
  BaseStylesheet
} from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";

export interface ICheckboxRef {
  isChecked: boolean;
  toggle: () => void;
}

export interface ICheckboxProps extends StandardProps<"input"> {
  /**
   * This props enables the possibility to show the checkbox as checked even though it is not
   * checked specifically (i.e. checking the checkbox when "All options" is selected).
   */
  showAsChecked?: boolean;
  /**
   *  Element that will be used when checkbox is checked.
   */
  checkedIcon?: JSX.Element;
}

export interface ICheckboxStyles {
  /**
   * Style of the whole container around the checkbox and its text
   */
  container?: BaseStylesheet;
  /**
   * Style applied to the text of the checkbox
   */
  checkboxText?: BaseStylesheet;
  /**
   * Style of the icon featuring inside the box
   */
  icon?: BaseStylesheet;
  /**
   * Style of the box where the icon of the checkbox will display
   */
  iconContainer?: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    outlineStyle: "none",
    userSelect: "none",
    cursor: "pointer",
    "@selectors": {
      ":hover .icon:not(.disabled):not(.checked):not(.show-as-checked)": {
        opacity: 1,
        stroke: theme.colors.grey.grey100
      },
      "&.disabled": {
        cursor: "initial"
      }
    }
  },
  checkboxText: {
    cursor: "inherit",
    ...theme.typography.body
  },
  icon: {
    opacity: 0,
    stroke: theme.colors.black,
    transition: "0.3s stroke, 0.3s opacity",
    "@selectors": {
      "&.show-as-checked": {
        opacity: 1,
        stroke: theme.colors.black
      },
      "&.checked": {
        opacity: 1,
        stroke: theme.colors.white
      },
      "&.disabled": {
        stroke: theme.colors.grey.grey100
      }
    }
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
    justifyContent: "center",
    "@selectors": {
      "&.show-as-checked": {},
      "&.checked": {
        backgroundColor: theme.colors.black
      },
      "&.disabled": {
        backgroundColor: theme.colors.grey.grey25,
        borderColor: theme.colors.grey.grey100
      }
    }
  }
});

const defaultCheckedIcon: JSX.Element = <Icon name="check" />;

const Checkbox: React.FC<ICheckboxProps & WithStylesProps> = ({
  styles,
  cx,
  className,
  checked,
  showAsChecked,
  onChange,
  checkedIcon = defaultCheckedIcon,
  children,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { disabled, name } = props;
  const [checkedState, setCheckedState] = useState(!!checked);

  const containerStyle = cx("diana-checkbox", styles.container, disabled && "disabled", className);
  const iconContainerStyle = cx(
    styles.iconContainer,
    "icon-container",
    showAsChecked && "show-as-checked",
    checkedState && "checked",
    disabled && "disabled"
  );
  const iconStyle = cx(
    styles.icon,
    "icon",
    showAsChecked && "show-as-checked",
    checkedState && "checked",
    disabled && "disabled"
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

  const handleClick = useCallback((e?: React.MouseEvent) => {
    const input = inputRef.current;
    if (e) {
      e.preventDefault();
    }

    return input?.click();
  }, []);

  useImperativeHandle<ICheckboxRef, ICheckboxRef>(wrappedRef, () => ({
    isChecked: checkedState,
    toggle: () => handleClick()
  }));

  const CheckedIcon: React.ReactNode = useMemo(() => {
    return React.cloneElement(checkedIcon, {
      className: iconStyle,
      size: 10
    });
  }, [checkedIcon, iconStyle]);

  return (
    <div className={containerStyle} onClick={handleClick}>
      <div className={iconContainerStyle}>{CheckedIcon}</div>
      <input
        type="checkbox"
        {...props}
        onChange={handleInputChange}
        onClick={e => e.stopPropagation()}
        checked={checkedState}
        ref={inputRef}
        style={{ display: "none" }}
        id={name}
      />
      <label htmlFor={name} className={cx(styles.checkboxText)}>
        {children}
      </label>
    </div>
  );
};

export default withStyles(styleSheet)(Checkbox);
