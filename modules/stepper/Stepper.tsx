import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  steps: number;
  activeStep?: number;
  initialActiveStep?: number;
  clickable?: boolean;
  onChange?: (stepIndex: number) => void;
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
  stepWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",

    "@selectors": {
      "&:first-child": {
        flex: 0
      }
    }
  },
  step: {
    boxSizing: "border-box",
    minWidth: 12,
    minHeight: 12,
    borderRadius: "50%",
    padding: 3,
    display: "flex",
    "@selectors": {
      "&.active": {},
      "&.clickable": {
        cursor: "pointer"
      }
    }
  },
  innerStep: {
    boxSizing: "border-box",
    flex: 1,
    borderRadius: "50%",
    "@selectors": {
      "&.active": {
        backgroundColor: theme.colors.black
      }
    }
  },
  line: {
    boxSizing: "border-box",
    width: "100%",
    height: 2,
    "@selectors": {
      "&.active": {}
    }
  }
});

const Stepper: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  className,
  steps,
  clickable = false,
  onChange,
  activeStep,
  initialActiveStep = 0,
  wrappedRef
}) => {
  const [_activeStep, setActiveStep] = useState(initialActiveStep);
  const containerStyle = cx("diana-stepper", styles.container, className);

  const _steps: boolean[] = useMemo(() => {
    const arraySteps = Array(steps).fill("");
    return arraySteps.map((_, i) => i <= _activeStep);
  }, [steps, _activeStep]);

  useEffect(() => {
    if (activeStep !== undefined) {
      setActiveStep(activeStep);
    }
  }, [activeStep]);

  const change = useCallback(
    stepIndex => {
      if (activeStep === undefined) {
        setActiveStep(stepIndex);
      }
      return onChange?.(stepIndex);
    },
    [onChange, activeStep]
  );

  return (
    <div className={containerStyle} ref={wrappedRef}>
      {_steps.map((isActive: boolean, i) => (
        <div className={cx(styles.stepWrapper)} key={i}>
          {i !== 0 && <div className={cx(styles.line, isActive && "active")} />}
          <div
            key={i}
            className={cx(styles.step, isActive && "active", clickable && "clickable")}
            onClick={() => clickable && change(i)}
          >
            <div className={cx(styles.innerStep, isActive && "active")} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default withStyles(stylesheet)(Stepper);
