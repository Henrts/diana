import React from "react";
import { StandardProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { WithStylesProps } from "@diana-ui/types/types";
import { withStyles } from "@diana-ui/base";

export interface IProps extends StandardProps<"div"> {
  steps: number;
  activeStep: number;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({});

const Stepper: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  className,
  steps,
  activeStep = 0,
  parentStylesheet
}) => {
  return <div>New Component stepper</div>;
};

export default withStyles(stylesheet)(Stepper);
