import React, { useCallback, useState } from "react";
import { Icon, IconNames } from "@diana-ui/icon";
import { ThemeStyleSheetFactory, Theme, WithStylesProps, BaseStylesheet } from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { BodyHighlight } from "@diana-ui/typography";
import Avatar, { IAvatarProps, IAvatarStyles } from "./Avatar";

export interface IImageAvatarProps extends IAvatarProps {
  /**
   * className for the innercircle
   */
  circleClassName?: string;
  /**
   * className to be applied to the content
   * inside the circle
   */
  className?: string;
  /**
   * if not undefined this will render an img tag
   * with this as source
   */
  src?: string;
  /**
   * alt attribute for the img tag
   */
  alt?: string;
  /**
   * fallbackText to be presented in case
   * an error has occured when loading the image
   */
  fallbackText?: string;
  /**
   * iconName from the Icon component
   * if there's no src, this will render
   * an Icon component where name = this property
   */
  icon?: string;
  /**
   * Icon's component size property
   */
  iconSize?: number;
  /**
   * Circle's component size property
   */
  circleSize?: number;
}

export interface IImageAvatarStyles extends IAvatarStyles {
  /**
   * styles the inner circle
   */
  circle?: BaseStylesheet;
  /**
   * styles the img tag
   * if src is provided
   */
  image?: BaseStylesheet;
  /**
   * styles the Icon component
   * if icon property is provided
   */
  icon?: BaseStylesheet;
  /**
   * styles for the avatar wrapper
   */
  avatarOverlay?: BaseStylesheet;
  /**
   * styles for the text when in xs
   */
  textxs?: BaseStylesheet;
  /**
   * styles for the text when in md
   */
  textmd?: BaseStylesheet;
  /**
   * styles for the text when in sm
   */
  textsm?: BaseStylesheet;
  /**
   * styles for the text when in lg
   */
  textlg?: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory<Theme, IImageAvatarStyles> = theme => ({
  circle: {
    height: "80%",
    width: "80%",
    borderRadius: "50%"
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "50%"
  },
  icon: {},
  avatarOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  }
});

type IProps = IImageAvatarProps & WithStylesProps<Theme, IImageAvatarStyles>;

export const ImageAvatar: React.FC<IProps> = ({
  circleClassName,
  className,
  backgroundColor,
  src,
  alt,
  fallbackText,
  icon,
  iconSize,
  circleSize,
  children,
  styles,
  cx,
  theme,
  ...rest
}) => {
  const { size } = rest;
  const [useFallback, setUseFallback] = useState(false);
  const onError = useCallback(() => {
    setUseFallback(true);
  }, []);

  const backgroundColorTheme = backgroundColor || theme?.colors.grey.grey25;
  return (
    <Avatar {...rest} backgroundColor={backgroundColorTheme}>
      <div className={cx(styles.avatarOverlay)}>
        <div
          className={cx(styles.circle, circleClassName)}
          style={{ backgroundColor: backgroundColorTheme, width: circleSize, height: circleSize }}
        >
          {(src && !useFallback && (
            <img className={cx(styles.image, className)} onError={onError} src={src} alt={alt} />
          )) ||
            ((useFallback || (!src && fallbackText)) && (
              <BodyHighlight className={cx(className, styles[`text${size}`])}>
                {fallbackText}
              </BodyHighlight>
            )) ||
            (icon && (
              <Icon
                className={cx(styles.icon, className)}
                name={icon as IconNames}
                size={iconSize}
              />
            )) ||
            children}
        </div>
      </div>
    </Avatar>
  );
};

ImageAvatar.displayName = "ImageAvatar";

export default withStyles(styleSheet, { register: true, passThemeProp: true })(ImageAvatar);
