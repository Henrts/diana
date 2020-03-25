import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import Slider, { ISliderProps } from "./Slider";

export interface ILockedSliderProps extends ISliderProps {
  startLocked?: boolean;
  lockedIcon: string;
  unlockedIcon: string;
  className?: string;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  lockWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1
  },
  iconWrapper: {
    marginLeft: theme.spaceUnit.md
  },
  icon: {}
});

const StyledSlider = Slider.extendStyles(theme => ({}));

const LockedSlider: React.FC<ILockedSliderProps & WithStylesProps> = ({
  cx,
  styles,
  onValueChange,
  startLocked = false,
  lockedIcon,
  unlockedIcon,
  className = "",
  ...props
}) => {
  const [isLocked, setIsLocked] = useState(startLocked);
  const icon = isLocked ? lockedIcon : unlockedIcon;
  return (
    <div className={cx(styles.lockWrapper, className)}>
      <StyledSlider
        inputClassName={cx(isLocked && "locked")}
        onValueChange={(!isLocked && onValueChange) || (() => {})}
        {...props}
      />
      <div
        className={cx(styles.iconWrapper)}
        onClick={() => setIsLocked(!isLocked)}
      >
        <Icon className={cx(styles.icon)} name={icon as any} />
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(LockedSlider);
