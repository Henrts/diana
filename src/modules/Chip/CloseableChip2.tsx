import React from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "../../types";
import CloseableChip, { IProps as CloseableChipProps } from "./CloseableChip";
import { withStyles } from "../../base";

export interface IProps extends CloseableChipProps {}

const styleSheet: ThemeStyleSheetFactory = () => ({
  chip: {
    borderColor: "blue",
    padding: "30px"
  },
  deleteIcon: {
    ":hover": {
      backgroundColor: "yellow"
    }
  }
});

const CloseableChipStyle2 = CloseableChip.extendStyles(styleSheet);

const CloseableChip2Component: React.FC<IProps & WithStylesProps> = props => {
  return <CloseableChipStyle2 {...props} />;
};

export default withStyles(styleSheet)(CloseableChip2Component);
