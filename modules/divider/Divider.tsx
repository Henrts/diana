import React from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

type orientations = "horizontal" | "vertical";

export interface IProps extends StandardProps<"div"> {
  orientation?: orientations;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  divider: {
    backgroundColor: theme.colors.black,
    "@selectors": {
      "&.horizontal": {
        height: "1px",
        width: "100%"
      },
      "&.vertical": {
        height: "100%",
        width: "1px"
      }
    }
  }
});

const Divider: React.FC<IProps & WithStylesProps> = ({
  className,
  cx,
  orientation = "horizontal",
  styles,
  wrappedRef
}) => {
  const dividerStyles = cx(
    "diana-divider",
    styles.divider,
    orientation === "horizontal" && "horizontal",
    orientation === "vertical" && "vertical",
    className
  );

  return <div className={dividerStyles} ref={wrappedRef} />;
};

export default withStyles(styleSheet)(Divider);
