import React from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana/types";
import { withStyles } from "@diana/base";

type orientations = "horizontal" | "vertical";

export interface IProps {
  className: string;
  orientation: orientations;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  divider: {
    backgroundColor: theme.colors.black,
    "@selectors": {
      "&.horizontal": {
        height: "1px",
        margin: `${theme.spaceUnit.md} 0`,
        width: "100%"
      },
      "&.vertical": {
        height: "100%",
        margin: `0 ${theme.spaceUnit.md}`,
        width: "1px"
      }
    }
  }
});

const Divider: React.FC<IProps & WithStylesProps> = ({
  className,
  cx,
  orientation = "horizontal",
  styles
}) => {
  const dividerStyles = cx(
    styles.divider,
    orientation === "horizontal" && "horizontal",
    orientation === "vertical" && "vertical",
    className
  );

  return <div className={dividerStyles} />;
};

export default withStyles(styleSheet)(Divider);
