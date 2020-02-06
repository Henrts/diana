/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback } from "react";
import uuid from "uuid";
import { WithStylesProps, ThemeStyleSheetFactory } from "../../types";
import { withStyles } from "../../base";
import { H3 } from "../Typography";
import { Icon } from "../Icon";
import { IconNames } from "../Icon/Icon";

export interface IProps {
  id: string;
  children: string;
  icon?: IconNames;
  title?: string;
  onMouseOver?: (id: string) => void;
  onMouseOut?: (id: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  icon: {
    marginRight: theme.spaceUnit.sm
  },
  text: {},
  title: {},
  wrapper: {
    "@selectors": {
      "&.enter": {
        opacity: 0,
        transform: "translateY(10px)"
      },
      "&.enter-active": {
        opacity: 1,
        transition: "opacity 250ms ease-in, transform 125ms ease-in",
        transform: "translateY(0px)"
      },
      "&.exit": {
        opacity: 1,
        transform: "translateY(0px)"
      },
      "&.exit-active": {
        opacity: 0,
        transform: "translateY(10px)",
        transition: "opacity 250ms ease-in, transform 125ms ease-in"
      }
    }
  }
});

const Notifcation: React.FC<IProps & WithStylesProps> = ({
  children,
  cx,
  icon,
  id = uuid(),
  title,
  styles,
  onMouseOver,
  onMouseOut
}) => {
  const textWithIconStyles = {
    display: "flex",
    alignItems: "center"
  };
  const handleMouseOver = () => onMouseOver?.(id);
  const handleMouseOut = () => onMouseOut?.(id);

  const renderText = useCallback(
    () => <span className={cx(styles.text)}>{children}</span>,
    [children, cx, styles.text]
  );

  return (
    <div
      className={cx(styles.wrapper)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {title && <H3 className={cx(styles.title)}>{title}</H3>}
      {icon ? (
        <div className={cx(textWithIconStyles)}>
          <Icon className={cx(styles.icon)} name={icon} />
          {renderText()}
        </div>
      ) : (
        renderText()
      )}
    </div>
  );
};

export default withStyles(styleSheet)(Notifcation);
