import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps, Theme, BaseStylesheet } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import Slider, { ISliderProps } from "./Slider";

export interface ILockedSliderProps extends ISliderProps {
  locked?: boolean;
  lockedIcon?: string;
  unlockedIcon?: string;
  className?: string;
  onLockChange?: (locked: boolean) => void;
}

export interface ILockedSliderStyles {
  /**
   * Wrapper for the whole component
   */
  lockWrapper?: BaseStylesheet;
  /**
   * Wrapper for the icon
   */
  iconWrapper?: BaseStylesheet;
  /**
   * styles for the icon
   */
  icon?: BaseStylesheet;
  /**
   * styles for disabled Icon
   */
  disabledIcon?: BaseStylesheet;
}

const styleSheet: ThemeStyleSheetFactory<Theme, ILockedSliderStyles> = theme => ({
  lockWrapper: {
    position: "relative",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    flexGrow: 1
  },
  iconWrapper: {
    cursor: "pointer",
    marginLeft: theme.spaceUnit.md
  },
  icon: {
    "@selectors": {
      "&.disabled": {
        fill: theme.colors.grey.grey100
      }
    }
  },
  disabledIcon: {}
});

const LockedSlider: React.FC<ILockedSliderProps & WithStylesProps<Theme, ILockedSliderStyles>> = ({
  cx,
  styles,
  onValueChange,
  onLockChange,
  locked,
  lockedIcon = "locked",
  unlockedIcon = "unlocked",
  className = "",
  disabled,
  ...props
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const icon = disabled ? lockedIcon : isLocked ? lockedIcon : unlockedIcon;

  useEffect(() => {
    if (locked !== undefined) {
      setIsLocked(locked);
    }
  }, [locked]);

  const onLockChangeInternal = useCallback(
    newValue => {
      if (locked === undefined) {
        setIsLocked(newValue);
      }
      return onLockChange?.(newValue);
    },
    [locked, onLockChange]
  );

  return (
    <div className={cx("diana-locked-slider", styles.lockWrapper, className)}>
      <Slider
        disabled={isLocked || disabled}
        inputClassName={cx(isLocked && !disabled && "locked")}
        onValueChange={(!isLocked && onValueChange) || (() => {})}
        {...props}
      />
      <div
        className={cx(styles.iconWrapper, disabled && styles.disabledIcon)}
        onClick={() => onLockChangeInternal(!isLocked)}
      >
        <Icon className={cx(styles.icon, disabled && "disabled")} name={icon as any} />
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(LockedSlider);
