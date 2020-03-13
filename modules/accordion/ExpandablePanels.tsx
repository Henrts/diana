import React, { useCallback, useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory
} from "@diana-ui/types";

export interface IProps extends StandardProps<"div"> {
  allowMultipleExpandedPanels: boolean;
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  panels: {
    border: "1px solid black"
  }
});

const ExpandablePanels: React.FC<IProps & WithStylesProps> = ({
  allowMultipleExpandedPanels = true,
  children,
  cx,
  styles
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleClick = useCallback(() => {
  //   setIsOpen(!isOpen);
  // }, [isOpen]);

  return <div className={cx(styles.panels)}>{children}</div>;
};

export default withStyles(stylesheet)(ExpandablePanels);
