import React from "react";
import { Icon } from "@diana-ui/icon";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import {
  Theme,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { IProps as BaseChipProps } from "./BaseChip";

export interface IProps extends BaseChipProps {
  onClose: () => void;
}

const styleSheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  chip: {
    borderColor: "green",
    height: 26,
    border: "10px solid",
    justifyContent: "space-between"
  },
  deleteIcon: {
    padding: theme.spaceUnit.xxs,
    marginLeft: theme.spaceUnit.xs,
    cursor: "pointer",
    borderRadius: "50%",
    ":hover": {
      backgroundColor: "red"
    }
  }
});

const CloseableChip: React.FC<IProps & WithStylesProps> = ({
  onClose = () => {},
  renderRightIcon,
  styles,
  cx,
  ...props
}) => {
  const CloseableChipStyle = useRegistryWithStyles<BaseChipProps>(
    "BaseChip",
    styleSheet
  );
  return (
    <CloseableChipStyle
      {...props}
      renderRightIcon={() => (
        <div
          onClick={e => {
            onClose();
            e.stopPropagation();
          }}
          className={cx(styles.deleteIcon)}
        >
          {renderRightIcon ? renderRightIcon() : <Icon name="close" size={8} />}
        </div>
      )}
    />
  );
};

export default withStyles(styleSheet, { register: true })(CloseableChip);
