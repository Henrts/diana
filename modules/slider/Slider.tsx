import React, { useState, useEffect, useCallback, useMemo } from "react";
import { withStyles } from "@diana-ui/base";
import { useWindowSize } from "@diana-ui/hooks";
import {
  ThemeStyleSheetFactory,
  WithStylesProps,
  StandardProps,
  BaseStylesheet,
  Theme
} from "@diana-ui/types";
import { Description, Label } from "@diana-ui/typography";
import calculateSliderStep from "./helpers/calculateSliderStep";

export interface ISliderProps extends StandardProps<"input"> {
  min: number;
  max: number;
  value?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onValueChange?: (value: number) => void;
}

export interface ISliderStyles {
  /**
   *  component wrapper
   */
  wrapper: BaseStylesheet;
  /**
   * value span wrapper
   */
  valueWrapper: BaseStylesheet;
  /**
   *  configs for input
   * since this isn't a custom slider and actually
   * uses the input type range from html there's some styles
   * required to overwride for the various available browser
   */
  input: BaseStylesheet;
  /**
   * styles for the value
   */
  value: BaseStylesheet;
  /**
   * styles for sm size
   */
  sm: BaseStylesheet;
  /**
   * styles for md size
   */
  md: BaseStylesheet;
}

const thumbSizes = {
  sm: 21,
  md: 32
};

const mixinThumbStyle = (size: "sm" | "md") => ({
  height: thumbSizes[size],
  width: thumbSizes[size],
  backgroundSize: `${thumbSizes[size]}px ${thumbSizes[size]}px`,
  marginTop: Math.round(thumbSizes[size] / -2)
});

const styleSheet: ThemeStyleSheetFactory<Theme, ISliderStyles> = () => ({
  wrapper: {},
  valueWrapper: {},
  input: {
    "@selectors": {
      "&.disabled::-webkit-slider-thumb": {},
      "&.disabled::-webkit-slider-runnable-track": {}
    },
    "&:focus": {},
    "&::-ms-track": {},
    "&::-webkit-slider-runnable-track": {}
  },
  sm: {
    height: thumbSizes.sm,
    "&::-webkit-slider-thumb": mixinThumbStyle("sm"),
    "&::-moz-range-thumb": mixinThumbStyle("sm"),
    "&::-ms-thumb": mixinThumbStyle("sm")
  },
  md: {
    height: thumbSizes.md,
    "&::-webkit-slider-thumb": mixinThumbStyle("md"),
    "&::-moz-range-thumb": mixinThumbStyle("md"),
    "&::-ms-thumb": mixinThumbStyle("md")
  },
  value: {}
});

const Slider: React.FC<ISliderProps & WithStylesProps<Theme, ISliderStyles>> = ({
  cx,
  styles,
  min,
  max,
  value,
  step,
  onValueChange,
  disabled = false,
  className = "",
  inputClassName = "",
  wrappedRef
}) => {
  const [width] = useWindowSize();
  const isMobile = width <= 700;
  const thumbSize = isMobile ? 21 : 32;
  const [leftSpacing, setLeftSpacing] = useState(9);
  const [_value, setValue] = useState(value || 0);
  const ref = React.createRef<HTMLInputElement>();

  const calculatedStep = useMemo(() => step ?? calculateSliderStep(max), [step, max]);
  const TextComponent = (isMobile && Label) || Description;

  /**
   * This function calculates the left space required
   * for the label with the value follow the thumb.
   * It tries to keep the number where the label is, so it rounds the number to the closest step.
   * The formula is as follows:
   *
   * (max - min) + 13
   * this gives the diference between max and min so we can
   * use value 0 as the starting point in case min is higher than 0
   * Having:
   * (sizes[size] / 2) + 2 - is the sum of half the thumb plus 2px that
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
  const alignToStep = _value % calculatedStep >= calculatedStep / 2 ? calculatedStep : 0;
  const calculateLeftSpace = useCallback(
    totalWidth =>
      ((_value - (_value % calculatedStep) + alignToStep) * totalWidth) / (max - min) +
      (thumbSize / 2 + 2) -
      (`${max}`.length * 20) / 2,
    [alignToStep, _value, calculatedStep, max, min, thumbSize]
  );

  useEffect(() => {
    setLeftSpacing(
      calculateLeftSpace(
        /**
         * if ref ins't defined yet the default is 0
         * in case it exists, at the total width of the input,
         * we subtract the thumb value since the thumb do not actually
         * hits the end neither the start
         * so half from the end + half from the end we get the full with
         * of the thumb
         */
        ref.current?.clientWidth ? ref.current.clientWidth - thumbSize : 0
      )
    );
  }, [ref, min, max, value, calculateLeftSpace, thumbSize]);

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  const changeValue = useCallback(
    newValue => {
      if (value === undefined) {
        setValue(newValue);
      }
      return onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <div className={cx("diana-slider", styles.wrapper, className)} ref={wrappedRef}>
      <div className={cx(styles.valueWrapper)}>
        <TextComponent
          style={{ left: leftSpacing, width: `${max}`.length * 20 }}
          className={cx(styles.value)}
        >
          {_value}
        </TextComponent>
      </div>
      <input
        ref={ref}
        className={cx(
          styles.input,
          (isMobile && styles.sm) || styles.md,
          disabled && "disabled",
          inputClassName
        )}
        type="range"
        min={min}
        max={max}
        value={_value}
        step={calculatedStep}
        onChange={ev => changeValue(Number(ev.currentTarget.value))}
        disabled={disabled}
      />
    </div>
  );
};

export default withStyles(styleSheet)(Slider);
