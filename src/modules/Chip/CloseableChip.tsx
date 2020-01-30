import React from "react";
import { Theme, WithStylesProps, ThemeStyleSheetFactory } from "../../types";
import { IProps as BaseChipProps } from "./BaseChip";
import { Icon } from "../Icon";
import { withStyles } from "../../base";
import useRegistryWithStyles from "../../hooks/useRegistry";

export interface IProps extends BaseChipProps {
  onClose: () => void;
}

const styleSheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  chip: {
    borderColor: "green"
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
          {renderRightIcon ? (
            renderRightIcon()
          ) : (
            <Icon name="close" size={12} />
          )}
        </div>
      )}
    />
  );
};

export default withStyles(styleSheet)(CloseableChip);
