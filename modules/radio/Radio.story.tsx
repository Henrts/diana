import React, { ReactElement } from "react";
import { useStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import Radio from "./Radio";

interface IProps {
  children: ReactElement;
  hasError?: boolean;
  label: string;
  selectedValue?: string;
  value: string;
  onValueSelect?: (value: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  svg: {
    fill: "none",
    verticalAlign: "middle"
  },
  circle: {
    strokeWidth: 2,
    stroke: "#C8CCD4"
  },
  innerPath: {
    stroke: "#008FFF",
    strokeWidth: 6,
    strokeDasharray: 19,
    strokeDashoffset: 19,
    "@selectors": {
      "&.checked": {
        strokeDashoffset: 38
      }
    }
  },
  outerPath: {
    stroke: "#008FFF",
    strokeWidth: 2,
    strokeDasharray: 57,
    strokeDashoffset: 57,
    "@selectors": {
      "&.checked": {
        strokeDashoffset: 0
      }
    }
  }
});

const CustomRadio: React.FC<IProps> = ({ selectedValue, ...props }) => {
  const StyledRadio = Radio.extendStyles(theme => ({
    input: {
      marginRight: theme.spaceUnit.xxs
    }
  }));

  const [styles, cx] = useStyles(styleSheet);

  return (
    <StyledRadio
      selectedValue={selectedValue}
      onValueSelect={() => {
        console.log("BIG YEET");
      }}
      {...props}
    >
      <svg width="20px" height="20px" viewBox="0 0 20 20" className={cx(styles.svg)}>
        <circle cx="10" cy="10" r="9" className={cx(styles.circle)}></circle>
        <path
          d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
          className={cx("inner", styles.innerPath, selectedValue && "checked")}
        ></path>
        <path
          d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
          className={cx("outer", styles.outerPath, selectedValue && "checked")}
        ></path>
      </svg>
    </StyledRadio>
  );
};

export { CustomRadio };
