import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { Theme, WithStylesProps } from "../../types";
import CloseableChip, { IProps as CloseableChipProps } from "./CloseableChip";
import CustomWithStyles from "./withStyles";

export interface IProps extends CloseableChipProps {}

const styleSheet: StyleSheetFactory<Theme> = (theme: Theme) => ({
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

const CloseableChip2Component: React.FC<IProps & WithStylesProps> = ({
  ...props
}) => {
  return <CloseableChipStyle2 {...props} />;
};

export default CustomWithStyles(styleSheet, { extendable: true })(
  CloseableChip2Component
);
