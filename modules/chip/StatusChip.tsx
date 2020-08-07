import React from "react";
import { extendStyles, withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { Theme, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { IProps as BaseChipProps } from "./BaseChip";

type ChipTypes = "default" | "success" | "warning" | "danger";

export interface IProps extends BaseChipProps {
  colorMap?: (theme: Theme) => { [type: string]: object };
  type: ChipTypes;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  chip: {
    justifyContent: "space-between"
  }
});

const defaultColorMap = (theme: Theme) => ({
  default: {
    chip: {
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: theme.colors.grey.grey100
    },
    selected: {
      backgroundColor: theme.colors.grey.grey25,
      borderColor: theme.colors.grey.grey25
    }
  },
  success: {
    chip: {
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: theme.colors.success.success100
    },
    selected: {
      backgroundColor: theme.colors.success.success25,
      borderColor: theme.colors.success.success25
    }
  },
  warning: {
    chip: {
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: theme.colors.warning.warning100
    },
    selected: {
      backgroundColor: theme.colors.warning.warning25,
      borderColor: theme.colors.warning.warning25
    }
  },
  danger: {
    chip: {
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: theme.colors.alert.alert100
    },
    selected: {
      backgroundColor: theme.colors.alert.alert25,
      borderColor: theme.colors.alert.alert25
    }
  }
});

const StatusChip: React.FC<IProps & WithStylesProps> = ({
  colorMap = defaultColorMap,
  type,
  ...props
}) => {
  const extendedStyleSheet = extendStyles(
    theme => ({
      ...colorMap(theme)[type]
    }),
    theme => styleSheet(theme)
  );

  const AlteredBaseChip = useRegistryWithStyles<BaseChipProps>("BaseChip", extendedStyleSheet);

  return <AlteredBaseChip {...props} />;
};

export default withStyles(styleSheet, { register: true })(StatusChip);
