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
      borderColor: theme.colors.grey.grey25
    },
    selected: {
      backgroundColor: theme.colors.grey.grey25
    }
  },
  success: {
    chip: {
      borderColor: theme.colors.success.success25
    },
    selected: {
      backgroundColor: theme.colors.success.success25
    }
  },
  warning: {
    chip: {
      borderColor: theme.colors.warning.warning25
    },
    selected: {
      backgroundColor: theme.colors.warning.warning25
    }
  },
  danger: {
    chip: {
      borderColor: theme.colors.alert.alert25
    },
    selected: {
      backgroundColor: theme.colors.alert.alert25
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
