import React from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana/types";
import { withStyles } from "@diana/base";

export interface IProps {
  children: JSX.Element[];
  disabled?: boolean;
  hasError?: boolean;
  name: string;
  selectedValue?: string;
  onValueSelect: (selectedValue: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const RadioGroup: React.FC<IProps & WithStylesProps> = ({
  children,
  cx,
  styles,
  ...props
}) => (
  <div className={cx(styles.radioGroup)}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        ...props,
      }),
    )}
  </div>
);

export default withStyles(styleSheet)(RadioGroup);
