import React from 'react';
import { useStyles } from '@diana/base';
import { StandardProps, ThemeStyleSheetFactory } from '@diana/types';

export interface IPropsTitle extends StandardProps<'h1'> {}
export interface IProps extends StandardProps<'span'> {}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  h1: {
    ...theme.typography.h1,
  },
  h2: {
    ...theme.typography.h2,
  },
  h3: {
    ...theme.typography.h3,
  },
  h4: {
    ...theme.typography.h4,
  },
  h5: {
    ...theme.typography.h5,
  },
  buttonText: {
    ...theme.typography.buttonText,
  },
  body: {
    ...theme.typography.body,
  },
  bodyHighlight: {
    ...theme.typography.bodyHighlight,
  },
  descriptionMedium: {
    ...theme.typography.descriptionMedium,
  },
  label: {
    ...theme.typography.label,
  },
});
export const H1: React.FC<IPropsTitle> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <h1 className={cx(styles.h1, className)} {...props}>
      {children}
    </h1>
  );
};

export const H2: React.FC<IPropsTitle> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <h2 className={cx(styles.h2, className)} {...props}>
      {children}
    </h2>
  );
};

export const H3: React.FC<IPropsTitle> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <h3 className={cx(styles.h3, className)} {...props}>
      {children}
    </h3>
  );
};

export const ButtonText: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.buttonText, className)} {...props}>
      {children}
    </span>
  );
};

export const Text: React.FC<IProps> = ({ children, className, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.body, className)} {...props}>
      {children}
    </span>
  );
};
export const TextHighlight: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.bodyHighlight, className)} {...props}>
      {children}
    </span>
  );
};

export const DescriptionMedium: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.descriptionMedium, className)} {...props}>
      {children}
    </span>
  );
};

export const Label: React.FC<IProps> = ({ children, className, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.label, className)} {...props}>
      {children}
    </span>
  );
};
