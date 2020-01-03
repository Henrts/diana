import React from "react";
import { StyleSheetFactory } from "aesthetic";
import { useStyles } from "aesthetic-react";
import { Theme } from "../../types";

export interface IProps {
  className?: string;
}

const styleSheet: StyleSheetFactory<Theme> = theme => ({
  h1: {
    ...theme.typography.h1
  },
  h2: {
    ...theme.typography.h2
  },
  h3: {
    ...theme.typography.h3
  },
  buttonText: {
    ...theme.typography.buttonText
  }
});
export const H1: React.FC<IProps> = ({ children, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return <h1 className={cx(styles.h1, props.className)}>{children}</h1>;
};

export const H2: React.FC<IProps> = ({ children, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return <h2 className={cx(styles.h2, props.className)}>{children}</h2>;
};

export const H3: React.FC<IProps> = ({ children, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return <h3 className={cx(styles.h3, props.className)}>{children}</h3>;
};

export const ButtonText: React.FC<IProps> = ({ children, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return <span className={cx(styles.buttonText, props.className)}>{children}</span>;
}
