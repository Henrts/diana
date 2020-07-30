import React from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory,
  BaseStylesheet,
  Theme
} from "@diana-ui/types";

export interface ICardProps extends StandardProps<"section"> {}

export interface ICardStyles {
  /**
   * This style affects the card element that wraps the card's different components
   */
  card?: BaseStylesheet;
}

const stylesheet: ThemeStyleSheetFactory<Theme, ICardStyles> = theme => ({
  card: {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.grey.grey25}`,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }
});

const Card: React.FC<ICardProps & WithStylesProps<Theme, ICardStyles>> = ({
  className,
  cx,
  styles,
  children,
  wrappedRef,
  onClick = () => {}
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      className={cx("diana-card", styles.card, className)}
      ref={wrappedRef}
      onClick={onClick}
    >
      {children}
    </section>
  );
};

export default withStyles(stylesheet)(Card);
