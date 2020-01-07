import React from "react";
import aesthetic, { StyleSheetFactory } from "aesthetic";
import { useStyles } from "aesthetic-react";
import { Theme } from "../../types";
import BaseChip, { IProps as BaseChipProps } from "./BaseChip";
import { Icon } from "../Icon";

export interface IProps extends BaseChipProps {
  onClose: () => void;
  styleSheet: (theme: Theme) => {};
}

const CloseableChip: React.FC<IProps> = ({
  onClose = () => {},
  renderRightIcon,
  styleSheet,
  ...props
}) => {
  const styleSheet2: StyleSheetFactory<Theme> = aesthetic.extendStyles(
    theme => ({
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
    }),
    theme => (styleSheet ? styleSheet(theme) : {})
  );

  const AlteredBaseChip = BaseChip.extendStyles(styleSheet2);

  const [styles, cx] = useStyles(styleSheet2);

  return (
    <AlteredBaseChip
      {...props}
      renderRightIcon={() => (
        <div
          onClick={e => {
            onClose();
            e.stopPropagation();
          }}
          className={cx(styles.deleteIcon)}
        >
          {renderRightIcon ? renderRightIcon() : <Icon name="add" size={12} />}
        </div>
      )}
    />
  );
};

export default CloseableChip;
