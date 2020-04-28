import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeStyleSheetFactory, StandardProps, WithStylesProps } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { ButtonText } from "@diana-ui/typography";

// @ts-ignore
export interface IProps extends StandardProps<"input"> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  displayFormat?: (value: number) => string;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  container: {
    boxSizing: "border-box",
    margin: 0,
    "@selectors": {
      "&:hover :not(.disabled).value": {}
    }
  },
  button: {
    outline: "none",
    cursor: "pointer",
    "@selectors": {
      "&.disabled": {
        cursor: "initial"
      }
    }
  },
  buttonMin: {},
  buttonMax: {},
  value: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 21,
    ...theme.typography.body,
    "@selectors": {
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        appearance: "none",
        margin: 0
      },
      "&::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        appearance: "none",
        margin: 0
      },
      "&.disabled": {},
      "&.focus:not(.disabled)": {}
    }
  }
});

const InputSpinner: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  className,
  value,
  initialValue = 0,
  onChange,
  displayFormat,
  parentStylesheet,
  ...props
}) => {
  const { min, max, step, disabled } = props;
  const [_value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = cx("input-spinner-container", styles.container, className);
  const buttonStyle = cx("input-spinner-button", styles.button, disabled && "disabled");
  const valueStyle = cx(
    "input-spinner-value",
    styles.value,
    disabled && "disabled",
    isFocused && "focus"
  );

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  const fixedValue = useMemo(() => {
    const valueState = _value;
    if (displayFormat) {
      return displayFormat(valueState);
    }

    // default display format
    if (!valueState) {
      return "00";
    }
    if (valueState < 10 && valueState > 0) {
      return `0${valueState}`;
    }
    return valueState.toString();
  }, [_value, displayFormat]);

  const changeValue = useCallback(
    newValue => {
      if (disabled) return;
      let limitedValue = max ? Math.min(max, newValue) : newValue;
      limitedValue = min ? Math.max(min, limitedValue) : limitedValue;

      if (value === undefined) {
        setValue(limitedValue);
      }
      return onChange?.(limitedValue);
    },
    [onChange, value, disabled, max, min]
  );

  const increase = useCallback(() => {
    const newValue = _value + (step ?? 1);
    changeValue(newValue);
  }, [_value, step, changeValue]);

  const decrease = useCallback(() => {
    const newValue = _value - (step ?? 1);
    changeValue(newValue);
  }, [_value, step, changeValue]);

  return (
    <div className={containerStyle}>
      <button
        type="button"
        className={cx(buttonStyle, styles.buttonMin)}
        onClick={e => {
          decrease();
          e.stopPropagation();
          e.preventDefault();
        }}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <ButtonText>-</ButtonText>
      </button>
      <input
        {...props}
        className={valueStyle}
        type="number"
        value={fixedValue}
        onChange={e => changeValue(parseInt(e.target.value, 10))}
        style={{ width: `${fixedValue.toString().length * 10}px` }}
      />
      <button
        type="button"
        className={cx(buttonStyle, styles.buttonMax)}
        onClick={e => {
          increase();
          e.stopPropagation();
          e.preventDefault();
        }}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <ButtonText>+</ButtonText>
      </button>
    </div>
  );
};

export default withStyles(styleSheet)(InputSpinner);
