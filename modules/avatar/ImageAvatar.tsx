import React, { useCallback, useState } from "react";
import { Icon, IconNames } from "@diana-ui/icon";
import {
  ThemeStyleSheetFactory,
  Theme,
  WithStylesProps
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { BodyHighlight } from "@diana-ui/typography";
import Avatar, { IAvatarProps } from "./Avatar";

export interface IImageAvatarProps extends IAvatarProps {
  circleClassName?: string;
  className?: string;

  src?: string;
  alt?: string;
  fallbackText?: string;

  icon?: string;
  iconSize?: number;
}

const styleSheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  circle: {
    height: "calc(100% - 16px)",
    width: "calc(100% - 16px)",
    borderRadius: "50%"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  icon: {}
});

type IProps = IImageAvatarProps & WithStylesProps;

const ImageAvatar: React.FC<IProps> = ({
  circleClassName,
  className,
  backgroundColor,
  src,
  alt,
  fallbackText,
  icon,
  iconSize,
  children,
  styles,
  cx,
  theme,
  ...rest
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const onError = useCallback(() => {
    setUseFallback(true);
  }, []);

  const backgroundColorTheme = backgroundColor || theme?.colors.grey.grey50;

  const lightenDarkenColor = useCallback((col, amt) => {
    let usePound = false;

    if (col[0] === "#") {
      // eslint-disable-next-line no-param-reassign
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    // eslint-disable-next-line no-bitwise
    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    // eslint-disable-next-line no-bitwise
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    // eslint-disable-next-line no-bitwise
    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    // eslint-disable-next-line no-bitwise
    let colorHex = (g | (b << 8) | (r << 16)).toString(16);
    if (colorHex.length === 5) {
      colorHex = `0${colorHex}`;
    }
    return (usePound ? "#" : "") + colorHex;
  }, []);

  return (
    <Avatar
      {...rest}
      backgroundColor={
        backgroundColorTheme && lightenDarkenColor(backgroundColorTheme, -20)
      }
    >
      <div
        className={cx(styles.circle, circleClassName)}
        style={{ backgroundColor: backgroundColorTheme }}
      >
        {(src && !useFallback && (
          <img
            className={cx(styles.image, className)}
            onError={onError}
            src={src}
            alt={alt}
          />
        )) ||
          ((useFallback || (!src && fallbackText)) && (
            <BodyHighlight className={className}>{fallbackText}</BodyHighlight>
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
    </Avatar>
  );
};

ImageAvatar.displayName = "ImageAvatar";

export default withStyles(styleSheet, { register: true, passThemeProp: true })(
  ImageAvatar
);
