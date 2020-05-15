/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback } from "react";
import { StandardProps, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { Body, BodyHighlight } from "@diana-ui/typography";
import { Icon, IIconProps } from "@diana-ui/icon";

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  id: string;
  iconProps?: IIconProps;
  text: string | JSX.Element;
  title?: string | JSX.Element;
  onMouseOver?: (id: string) => void;
  onMouseOut?: (id: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  text: {},
  textIcon: {
    marginRight: theme.spaceUnit.sm
  },
  title: {},
  titleIcon: {
    marginRight: theme.spaceUnit.sm
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
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

const Notification: React.FC<IProps & WithStylesProps> = ({
  cx,
  className,
  iconProps,
  id,
  text,
  title,
  styles,
  onMouseOver,
  onMouseOut,
  wrappedRef
}) => {
  const contentWrapperStyles = {
    display: "flex",
    alignItems: "center"
  };
  const handleMouseOver = () => onMouseOver?.(id);
  const handleMouseOut = () => onMouseOut?.(id);

  const renderText = useCallback(
    () => (typeof text === "string" ? <Body className={cx(styles.text)}>{text}</Body> : text),
    [cx, styles.text, text]
  );

  const renderTitle = useCallback(
    () =>
      typeof title === "string" ? (
        <BodyHighlight className={cx(styles.title)}>{title}</BodyHighlight>
      ) : (
        title
      ),
    [cx, styles, title]
  );

  return (
    <div
      className={cx("diana-notification", styles.wrapper, className)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={wrappedRef}
    >
      {title &&
        (iconProps ? (
          <div className={cx(contentWrapperStyles)}>
            <Icon className={cx(styles.titleIcon)} {...iconProps} />
            {renderTitle()}
          </div>
        ) : (
          renderTitle()
        ))}
      {!title && iconProps ? (
        <div className={cx(contentWrapperStyles)}>
          <Icon className={cx(styles.textIcon)} {...iconProps} />
          {renderText()}
        </div>
      ) : (
        renderText()
      )}
    </div>
  );
};

Notification.displayName = "Notification";

export default withStyles(styleSheet, { register: true })(Notification);
