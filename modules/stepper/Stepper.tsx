import React, { useMemo } from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

export interface IProps extends StandardProps<"div"> {
  steps: number;
  activeStep?: number;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  step: {
    boxSizing: "border-box",
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: theme.colors.grey.grey50,
    padding: 3,
    display: "flex"
  },
  activeStep: {
    boxSizing: "border-box",
    flex: 1,
    borderRadius: "50%",
    backgroundColor: theme.colors.black
  },
  line: {
    zIndex: -1,
    boxSizing: "border-box",
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: theme.colors.grey.grey50
  }
});

const Stepper: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  className,
  steps,
  activeStep = 0
}) => {
  const containerStyle = cx(styles.container, className);

  const _steps: boolean[] = useMemo(() => {
    const arraySteps = Array(steps).fill("");
    return arraySteps.map((_, i) => i <= activeStep);
  }, [steps, activeStep]);

  return (
    <div className={containerStyle}>
      <div className={cx(styles.line)} />
      {_steps.map((isActive: boolean, i) => (
        <div key={i} className={cx(styles.step)}>
          <div className={cx(isActive && styles.activeStep)} />
        </div>
      ))}
    </div>
  );
};

export default withStyles(stylesheet)(Stepper);
