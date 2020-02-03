import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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
  checkedIcon?: JSX.Element;
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

const Checkbox: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
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

  const containerStyle = cx(styles.container, disabled && "disabled");
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
      e.stopPropagation();
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
