import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import { useWindowSize } from "@diana-ui/hooks";
import {
  ThemeStyleSheetFactory,
  WithStylesProps,
  StandardProps
} from "@diana-ui/types";
import { Label } from "@diana-ui/typography";

export interface ISliderProps extends StandardProps<"input"> {
  min: number;
  max: number;
  value?: number;
  step: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onValueChange?: (value: number) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {},
  valueWrapper: {},
  input: {
    "&::-webkit-slider-thumb": {},
    "@selectors": {
      "&.disabled::-webkit-slider-thumb": {},
      "&.disabled::-webkit-slider-runnable-track": {}
    },
    "&::-moz-range-thumb": {},
    "&::-ms-thumb": {},
    "&:focus": {},
    "&::-ms-track": {},
    "&::-webkit-slider-runnable-track": {}
  },
  value: {}
});

const Slider: React.FC<ISliderProps & WithStylesProps> = ({
  cx,
  styles,
  min,
  max,
  value,
  step,
  onValueChange,
  disabled = false,
  className = "",
  inputClassName = ""
}) => {
  const windowSize = useWindowSize();
  const [size, setSize] = useState(9);
  const [_value, setValue] = useState(value || 0);
  const ref = React.createRef<HTMLInputElement>();

  /**
   * This function calculates the left space required
   * for the label with the value follow the thumb.
   * The formula is as follows:
   *
   * (max - min) + 13
   * this gives the diference between max and min so we can
   * use value 0 as the starting point in case min is higher than 0
   * Having:
   * 13 - is the sum of half the thumb (which is 11px) plus 2px that
   * correspond to slider bar that the thumb don't reach. Basically the
   * thumb do not touch the start / end of the bar, and that is 2px
   *
   *
   * this calculates the width of the span that contains the value
   * and divides it by 2. This will give us the distance between the
   * left corner and the middle on
   * having:
   * 20px as default size for letter
   * (`${max}`.length * 20) / 2
   */
  const calculateLeftSpace = useCallback(
    totalWidth =>
      (_value * totalWidth) / (max - min) + 13 - (`${max}`.length * 20) / 2,
    [max, min, _value]
  );

  useEffect(() => {
    setSize(
      calculateLeftSpace(
        /**
         * if ref ins't defined yet the default is 0
         * in case it exists, at the total width of the input,
         * we subtract the thumb value since the thumb do not actually
         * hits the end neither the start
         * so half from the end + half from the end we get the full with
         * of the thumb
         */
        ref.current?.clientWidth ? ref.current.clientWidth - 21 : 0
      )
    );
  }, [ref, min, max, value, calculateLeftSpace, windowSize]);

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

  const changeValue = useCallback(
    newValue => {
      if (value) {
        setValue(newValue);
      }
      return onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.valueWrapper)}>
        <Label
          style={{ left: size, width: `${max}`.length * 20 }}
          className={cx(styles.value)}
        >
          {_value}
        </Label>
      </div>
      <input
        ref={ref}
        className={cx(styles.input, disabled && "disabled", inputClassName)}
        type="range"
        min={min}
        max={max}
        value={_value}
        step={step}
        onChange={ev => changeValue(Number(ev.currentTarget.value))}
        disabled={disabled}
      />
    </div>
  );
};

export default withStyles(styleSheet)(Slider);
