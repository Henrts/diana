import React, { useState, InputHTMLAttributes, useEffect } from "react";
import { withStyles, useStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { LabelRegular } from "@diana-ui/typography";

const DEFAULT_THUMB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAuNSIgY3k9IjEwLjUiIHI9IjEwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjMDcwNzA3Ii8+CjxsaW5lIHgxPSI4LjU3NjkiIHkxPSI1LjM0NjE5IiB4Mj0iOC41NzY5IiB5Mj0iMTUuNjUzOSIgc3Ryb2tlPSIjMDcwNzA3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgeDE9IjExLjgwNzciIHkxPSI1LjM0NjE5IiB4Mj0iMTEuODA3NyIgeTI9IjE1LjY1MzkiIHN0cm9rZT0iIzA3MDcwNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=";
const DISABLED_THUMB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAuNSIgY3k9IjEwLjUiIHI9IjEwIiBmaWxsPSIjODA4MDgwIiBzdHJva2U9IiNDQ0NDQ0MiLz4KPGxpbmUgeDE9IjguNTc2OSIgeTE9IjUuMzQ2MTkiIHgyPSI4LjU3NjkiIHkyPSIxNS42NTM5IiBzdHJva2U9IiNDQ0NDQ0MiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4MT0iMTEuODA3NiIgeTE9IjUuMzQ2MTkiIHgyPSIxMS44MDc2IiB5Mj0iMTUuNjUzOSIgc3Ryb2tlPSIjQ0NDQ0NDIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==";

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
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  valueWrapper: {
    height: 10,
    width: "100%"
  },
  input: {
    "-webkit-appearance": "none",
    width: "100%",
    height: 21,
    background: "transparent",
    "&::-webkit-slider-thumb": {
      "-webkit-appearance": "none",
      // border: "1px solid #000000",
      height: 21,
      width: 21,
      borderRadius: "50%",
      background: "black",
      cursor: "pointer",
      marginTop: -10,
      backgroundImage: `url('${DEFAULT_THUMB}')`
    },
    "@selectors": {
      "&.disabled::-webkit-slider-thumb": {
        backgroundImage: `url('${DISABLED_THUMB}')`
      },
      "&.disabled::-webkit-slider-runnable-track": {
        borderColor: "#CCC"
      }
    },
    "&::-moz-range-thumb": {
      boxShadow: "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
      border: "1px solid #000000",
      height: 36,
      width: 16,
      borderRadius: 3,
      background: "#ffffff",
      cursor: "pointer"
    },
    "&::-ms-thumb": {
      boxShadow: "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
      border: "1px solid #000000",
      height: 36,
      width: 16,
      borderRadius: 3,
      background: "#ffffff",
      cursor: "pointer"
    },
    "&:focus": {
      outline: "none"
    },
    "&::-ms-track": {
      width: "100%",
      cursor: "pointer",
      background: "transparent",
      borderColor: "transparent",
      color: "transparent"
    },
    "&::-webkit-slider-runnable-track": {
      width: "100%",
      height: 0,
      cursor: "pointer",
      border: "1px solid #010101"
    }
  },
  value: {
    position: "absolute",
    display: "flex",
    justifyContent: "center"
  }
});

const calculateLeftSpace = (
  totalWidth: number,
  min: number,
  max: number,
  value: number
) => {
  return (value * totalWidth) / (max - min) + 13 - (`${max}`.length * 20) / 2;
};

// class Slider extends React.Component<
//   ISliderProps & WithStylesProps,
//   ISliderState
// > {
//   ref = React.createRef<HTMLInputElement>();

//   constructor(props: ISliderProps & WithStylesProps) {
//     super(props);

//     this.state = {
//       leftSpacing: 0
//     };

//     document.addEventListener('resize', () => {

//     })
//   }

//   componentDidMount() {
//     const { min, max, value } = this.props;
//     this.setState({
//       leftSpacing: calculateLeftSpace(
//         this.ref.current?.clientWidth ? this.ref.current.clientWidth - 21 : 0,
//         min,
//         max,
//         value
//       )
//     });
//   }

//   render() {
//     const {
//       cx,
//       styles,
//       min,
//       max,
//       value,
//       step,
//       onChange,
//       disabled = false,
//       className = ""
//     } = this.props;

//     return (
//       <div className={cx(styles.wrapper)}>
//         <div className={cx(styles.valueWrapper)}>
//           <LabelRegular
//             style={{
//               left:
//                 calculateLeftSpace(
//                   this.ref.current?.clientWidth
//                     ? this.ref.current.clientWidth - 21
//                     : 0,
//                   min,
//                   max,
//                   value
//                 ) || this.state.leftSpacing,
//               width: `${max}`.length * 20
//             }}
//             className={cx(styles.value)}
//           >
//             {value}
//           </LabelRegular>
//         </div>
//         <input
//           ref={this.ref}
//           className={cx(styles.input, disabled && "disabled", className)}
//           type="range"
//           min={min}
//           max={max}
//           value={value}
//           step={step}
//           onChange={ev => onChange?.(ev.currentTarget.value)}
//           disabled={disabled}
//         />
//       </div>
//     );
//   }
// }

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
