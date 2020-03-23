import React, { useState, useEffect } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { LabelRegular } from "@diana-ui/typography";

export interface ISliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: any;
  disabled?: boolean;
  className?: string;
}

export interface ISliderState {
  leftSpacing: number;
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

const calculateLeftSpace = (
  totalWidth: number,
  min: number,
  max: number,
  value: number
) => (value * totalWidth) / (max - min) + 13 - (`${max}`.length * 20) / 2;

const Slider: React.FC<ISliderProps & WithStylesProps> = ({
  cx,
  styles,
  min,
  max,
  value,
  step,
  onChange,
  disabled = false,
  className = ""
}) => {
  const [size, setSize] = useState(9);
  const ref = React.createRef<HTMLInputElement>();
  useEffect(() => {
    function updateLeftSpacing() {
      setSize(
        calculateLeftSpace(
          ref.current?.clientWidth ? ref.current.clientWidth - 21 : 0,
          min,
          max,
          value
        )
      );
    }

    updateLeftSpacing();

    window.addEventListener("resize", updateLeftSpacing);

    return () => window.removeEventListener("resize", updateLeftSpacing);
  }, [ref, min, max, value]);
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.valueWrapper)}>
        <LabelRegular
          style={{ left: size, width: `${max}`.length * 20 }}
          className={cx(styles.value)}
        >
          {value}
        </LabelRegular>
      </div>
      <input
        ref={ref}
        className={cx(styles.input, disabled && "disabled", className)}
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={ev => onChange?.(ev.currentTarget.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default withStyles(styleSheet)(Slider);
