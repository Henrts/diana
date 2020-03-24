import React from "react";
import { useStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory } from "@diana-ui/types";

export interface IPropsTitle extends StandardProps<"h1"> {}
export interface IProps extends StandardProps<"span"> {}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  pageTitle: {
    ...theme.typography.pageTitle
  },
  subtitle: {
    ...theme.typography.subtitle
  },
  sectionTitle: {
    ...theme.typography.sectionTitle
  },
  buttonText: {
    ...theme.typography.buttonText
  },
  bodyHighlight: {
    ...theme.typography.bodyHighlight
  },
  body: {
    ...theme.typography.body
  },
  descriptionMedium: {
    ...theme.typography.descriptionMedium
  },
  description: {
    ...theme.typography.description
  },
  labelMedium: {
    ...theme.typography.labelMedium
  },
  label: {
    ...theme.typography.label
  },
  notificationsNumbers: {
    ...theme.typography.notificationsNumbers
  }
});

export const PageTitle: React.FC<IPropsTitle> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <h1 className={cx(styles.pageTitle, className)} {...props}>
      {children}
    </h1>
  );
};

export const Subtitle: React.FC<IPropsTitle> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <h2 className={cx(styles.subtitle, className)} {...props}>
      {children}
    </h2>
  );
};

export const SectionTitle: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.sectionTitle, className)} {...props}>
      {children}
    </span>
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

export const BodyHighlight: React.FC<IProps> = ({
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

export const Body: React.FC<IProps> = ({ children, className, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.body, className)} {...props}>
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

export const Description: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.description, className)} {...props}>
      {children}
    </span>
  );
};

export const LabelMedium: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.labelMedium, className)} {...props}>
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

export const NotificationsNumbers: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <span className={cx(styles.notificationsNumbers, className)} {...props}>
      {children}
    </span>
  );
};
