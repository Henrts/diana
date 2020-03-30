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
    height: "calc(100% - 8px)",
    width: "calc(100% - 8px)",
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
  src,
  alt,
  fallbackText,
  icon,
  iconSize,
  children,
  styles,
  cx,
  ...rest
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const onError = useCallback(() => {
    setUseFallback(true);
  }, []);
  return (
    <Avatar {...rest}>
      <div className={cx(styles.circle, circleClassName)}>
        {(src && !useFallback && (
          <img
            className={cx(styles.image, className)}
            onError={onError}
            src={src}
            alt={alt}
          />
        )) ||
          (useFallback && (
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

export default withStyles(styleSheet)(ImageAvatar);
