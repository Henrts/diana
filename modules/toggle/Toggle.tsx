import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
  BaseStylesheet
} from "@diana-ui/types";

export interface IToggleRef {
  isChecked: boolean;
  toggle: () => void;
}

export interface IToggleProps extends StandardProps<"input"> {}

export interface IToggleStyles {
  /**
   * Style of the wrapper around the toggle and its text
   */
  wrapper?: BaseStylesheet;
  /**
   * Style of the container of the toggle
   */
  container?: BaseStylesheet;
  /**
   * Style applied to the text of the toggle
   */
  toggleText?: BaseStylesheet;
  /**
   * Style of the thumb featuring inside the container
   */
  thumb?: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    outlineStyle: "none",
    userSelect: "none",
    cursor: "pointer",
    "@selectors": {
      ":hover .diana-toggle:not(.disabled):not(.checked)": {
        borderColor: theme.colors.black
      },
      ":hover .diana-toggle-thumb:not(.disabled):not(.checked)": {
        backgroundColor: theme.colors.black
      }
    }
  },
  container: {
    display: "flex",
    flexDirection: "row",
    outlineStyle: "none",
    userSelect: "none",
    cursor: "pointer",
    border: "1px solid",
    borderColor: theme.colors.grey.grey50,
    width: 30,
    boxSizing: "border-box",
    padding: 2,
    borderRadius: 10,
    "@selectors": {
      "&.checked": {
        borderColor: theme.colors.black
      },
      "&.disabled": {
        borderColor: theme.colors.grey.grey100
      }
    }
  },
  text: {
    cursor: "inherit",
    marginLeft: theme.spaceUnit.xxs,
    ...theme.typography.description
  },
  thumb: {
    height: theme.spaceUnit.sm,
    width: theme.spaceUnit.sm,
    borderRadius: 10,
    backgroundColor: theme.colors.grey.grey50,
    transition: "0.3s margin-left",
    marginLeft: 0,
    "@selectors": {
      "&.checked": {
        backgroundColor: theme.colors.black,
        marginLeft: theme.spaceUnit.sm
      },
      "&.disabled": {
        backgroundColor: theme.colors.grey.grey100
      }
    }
  }
});

const Toggle: React.FC<IToggleProps & WithStylesProps> = ({
  styles,
  cx,
  className,
  checked,
  onChange,
  children,
  wrappedRef,
  parentStylesheet,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { disabled, name } = props;
  const [checkedState, setCheckedState] = useState(!!checked);

  const containerStyle = cx(
    "diana-toggle",
    styles.container,
    checkedState && "checked",
    disabled && "disabled",
    className
  );

  const thumbStyle = cx(
    styles.thumb,
    "diana-toggle-thumb",
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

  useImperativeHandle<IToggleRef, IToggleRef>(wrappedRef, () => ({
    isChecked: checkedState,
    toggle: () => handleClick()
  }));

  return (
    <div className={cx(styles.wrapper)} onClick={handleClick}>
      <div className={containerStyle}>
        <div className={thumbStyle} />
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
      </div>
      <label htmlFor={name} className={cx(styles.text)}>
        {children}
      </label>
    </div>
  );
};

export default withStyles(styleSheet)(Toggle);
