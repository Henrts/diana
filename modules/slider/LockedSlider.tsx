import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import Slider, { ISliderProps } from "./Slider";

export interface ILockedSliderProps extends ISliderProps {
  startLocked?: boolean;
  lockedIcon: string;
  unlockedIcon: string;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  lockWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%"
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
  ...props
}) => {
  const [isLocked, setIsLocked] = useState(startLocked);
  const icon = isLocked ? lockedIcon : unlockedIcon;
  return (
    <div className={cx(styles.lockWrapper)}>
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
