import React from "react";
import { Theme } from "../../types";
import { Icon } from "../Icon";
import { StyleSheetFactory } from "aesthetic";
import { useStyles } from "aesthetic-react";
import CloseableChip from "./CloseableChip";

const styleSheet: StyleSheetFactory<Theme> = theme => ({
  iconLeft: {
    marginRight: "8px"
  },
  iconRight: {
    marginLeft: "8px"
  }
});
export const ChipIcon: React.FC<{ name: string; type: "left" | "right" }> = ({
  children,
  type,
  name,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <Icon
      size={16}
      name={name}
      className={cx(
        type === "left" && styles.iconLeft,
        type === "right" && styles.iconRight
      )}
    />
  );
};

export const DerivedCloseableChip: React.FC = ({ ...props }) => {
  return (
    <CloseableChip
      styleSheet={(theme: Theme) => ({
        chip: {
          borderColor: "red",
          backgroundColor: "blue"
        },
        deleteIcon: {
          ":hover": {
            backgroundColor: "steelblue"
          }
        }
      })}
      onClose={() => {}}
      {...props}
    />
  );
};
