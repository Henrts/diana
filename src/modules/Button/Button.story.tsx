import React from "react";
import BaseButton from "./BaseButton";
import { Theme } from "../../types";
import { Icon } from "../Icon";
import { StyleSheetFactory } from "aesthetic";
import { useStyles } from "aesthetic-react";
const styleSheet: StyleSheetFactory<Theme> = theme => ({
  icon: {
    marginRight: "12px"
  }
});
export const DerivedButton: React.FC = ({ ...props }) => {
  const AlteredBaseButton = BaseButton.extendStyles((theme: Theme) => ({
    button: {
      backgroundColor: "steelblue",
      color: "white",
      padding: "12px 16px",
      borderRadius: "10px"
    }
  }));

  const [styles, cx] = useStyles(styleSheet);
  const renderLeftIcon = () => (
    <Icon stroke="white" size={20} name="add" className={cx(styles.icon)} />
  );
  return <AlteredBaseButton renderLeftIcon={renderLeftIcon} {...props} />;
};
