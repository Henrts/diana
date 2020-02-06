import React from "react";
import { Icon } from "@diana/icon";
import { withStyles } from "@diana/base";
import { Theme, WithStylesProps, ThemeStyleSheetFactory } from "../types/types";
import { IProps as BaseChipProps } from "./BaseChip";
import useRegistryWithStyles from "../hooks/useRegistry";

export interface IProps extends BaseChipProps {
  onClose: () => void;
}

const styleSheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  chip: {
    borderColor: "green",
    height: 26,
    border: "10px solid",
  },
  deleteIcon: {
    padding: theme.spaceUnit.xxs,
    marginLeft: theme.spaceUnit.xs,
    cursor: "pointer",
    borderRadius: "50%",
    ":hover": {
      backgroundColor: "red",
    },
  },
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
    styleSheet,
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
