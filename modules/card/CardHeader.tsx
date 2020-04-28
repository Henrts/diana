import React, { useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { LabelMedium, SectionTitle, Body } from "@diana-ui/typography";
import { Icon } from "@diana-ui/icon";

// @ts-ignore
export interface IProps extends StandardProps<"header"> {
  icon?: string;
  label?: string;
  title: JSX.Element | string;
  subtitle?: string;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  icon: {},
  label: {},
  subtitle: {
    flex: 1,
    marginTop: theme.spaceUnit.xs
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1
  },
  title: {
    flex: 1
  }
});

const CardHeader: React.FC<IProps & WithStylesProps> = ({
  className,
  cx,
  icon,
  label,
  styles,
  subtitle,
  title
}) => {
  const renderTitle = useCallback(
    () =>
      typeof title === "string" ? (
        <SectionTitle className={cx(styles.title)}>{title}</SectionTitle>
      ) : (
        title
      ),
    [cx, styles, title]
  );

  return (
    <header className={cx(styles.header, className)}>
      <div className={cx(styles.titleWrapper)}>
        {renderTitle()}
        {subtitle && <Body className={cx(styles.subtitle)}>{subtitle}</Body>}
      </div>
      {label && <LabelMedium className={cx(styles.label)}>{label}</LabelMedium>}
      {icon && <Icon className={cx(styles.icon)} name={icon as any} />}
    </header>
  );
};

export default withStyles(stylesheet)(CardHeader);
