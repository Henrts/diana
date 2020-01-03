import React from "react";
import BaseButton from "./BaseButton";
import { Theme } from "../../types";
import { Icon } from "../Icon/Icon";

export const DerivedButton: React.FC = ({ children, ...props }) => {
  const AlteredBaseButton = BaseButton.extendStyles((theme: Theme) => ({
    button: {
      border: "2px solid blue"
    }
  }));
  const renderLeftIcon = () => <Icon name="add" />;

  return (
    <AlteredBaseButton renderLeftIcon={renderLeftIcon} {...props}>
      {children}
    </AlteredBaseButton>
  );
};
