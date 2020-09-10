import React, { useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  ThemeStyleSheetFactory,
  WithStylesProps,
  BaseStylesheet
} from "@diana-ui/types";
import { LabelMedium, SectionTitle, Body } from "@diana-ui/typography";
import { Icon, IIconProps } from "@diana-ui/icon";

// @ts-ignore
export interface ICardHeaderProps extends StandardProps<"header"> {
  /**
   * Name of the icon to be displayed in the top right corner.
   * icon and label should be mutually exclusive
   */
  icon?: string;
  /**
   * A label to be displayed in the top right corner.
   * icon and label should be mutually exclusive
   */
  label?: string;
  /**
   * CardHeader's title. It can either be a string or a custom element
   */
  title: JSX.Element | string;
  /**
   * CardHeader's subtitle
   */
  subtitle?: string;
}

export interface ICardHeaderStyles {
  /**
   * This style affects the CardHeader's wrapper element
   */
  header?: BaseStylesheet;
  /**
   * This style affects the icon element displayed in the top right corner
   */
  icon?: BaseStylesheet;
  /**
   * This style affects the label element displayed in the top right corner
   */
  label?: BaseStylesheet;
  /**
   * This style affects the CardHeader's subtitle element
   */
  subtitle?: BaseStylesheet;
  /**
   * This style affects the wrapper around the title and subtitle elements
   */
  titleWrapper?: BaseStylesheet;
  /**
   * This style affects the CardHeader's title element
   */
  title?: BaseStylesheet;
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

export const CardHeader: React.FC<ICardHeaderProps & WithStylesProps> = ({
  className,
  cx,
  icon,
  label,
  styles,
  subtitle,
  title,
  wrappedRef
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
    <header className={cx("diana-card-header", styles.header, className)} ref={wrappedRef}>
      <div className={cx(styles.titleWrapper)}>
        {renderTitle()}
        {subtitle && <Body className={cx(styles.subtitle)}>{subtitle}</Body>}
      </div>
      {label && <LabelMedium className={cx(styles.label)}>{label}</LabelMedium>}
      {icon && <Icon className={cx(styles.icon)} name={icon as IIconProps["name"]} />}
    </header>
  );
};

export default withStyles(stylesheet)(CardHeader);
