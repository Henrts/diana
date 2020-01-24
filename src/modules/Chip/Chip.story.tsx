import React from "react";
import { ThemeStyleSheetFactory } from "../../types";
import { Icon } from "../Icon";
import { useStyles } from "../../base";
import { IconNames } from "../Icon/Icon";

const styleSheet: ThemeStyleSheetFactory = theme => ({
  iconLeft: {
    marginRight: "8px"
  },
  iconRight: {
    marginLeft: "8px"
  }
});
export const ChipIcon: React.FC<{
  name: IconNames;
  type: "left" | "right";
}> = ({ children, type, name, ...props }) => {
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
