import React from "react";
import BaseButton, {
  // @ts-ignore
  typesLoaderProps,
  // @ts-ignore
  typesLoaderStyles
} from "./BaseButton";
import { Theme, ThemeStyleSheetFactory } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { useStyles } from "@diana-ui/base";
import { typesHighlight } from "../../.storybook/helpers";

const { Props, Styles } = typesHighlight(typesLoaderProps, typesLoaderStyles);
export { Props, Styles };

const styleSheet: ThemeStyleSheetFactory = theme => ({
  icon: {
    marginRight: "12px"
  }
});

const AlteredBaseButton = BaseButton.extendStyles((theme: Theme) => ({
  button: {
    backgroundColor: "steelblue",
    color: "white",
    padding: "12px 16px",
    borderRadius: "10px"
  }
}));

export const DerivedButton: React.FC = ({ ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  const renderLeftIcon = () => (
    <Icon stroke="white" size={20} name="add" className={cx(styles.icon)} />
  );
  return <AlteredBaseButton renderLeftIcon={renderLeftIcon} {...props} />;
};
