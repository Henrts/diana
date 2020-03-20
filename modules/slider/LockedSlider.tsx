import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import Slider, { ISliderProps } from "./Slider";

export interface ILockedSliderProps extends ISliderProps {
  startLocked?: boolean;
  lockedIcon: string | React.ReactNode;
  unlockedIcon: string | React.ReactNode;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%"
  },
  icon: {}
});

const LOCKED_THUMB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAuNSIgY3k9IjEwLjUiIHI9IjEwLjUiIGZpbGw9IiMwNzA3MDciLz4KPGxpbmUgeDE9IjguNTc2OSIgeTE9IjUuMzQ2MTkiIHgyPSI4LjU3NjkiIHkyPSIxNS42NTM5IiBzdHJva2U9IndoaXRlIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgeDE9IjExLjgwNzYiIHkxPSI1LjM0NjE5IiB4Mj0iMTEuODA3NiIgeTI9IjE1LjY1MzkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K";

const StyledSlider = Slider.extendStyles(theme => ({
  input: {
    "@selectors": {
      "&.locked::-webkit-slider-thumb": {
        backgroundImage: `url('${LOCKED_THUMB}')`
      }
    }
  }
}));

const LockedSlider: React.FC<ILockedSliderProps & WithStylesProps> = ({
  cx,
  styles,
  onChange,
  startLocked = false,
  lockedIcon,
  unlockedIcon,
  ...props
}) => {
  const [isLocked, setIsLocked] = useState(startLocked);
  return (
    <div className={cx(styles.wrapper)}>
      <StyledSlider
        className={cx(isLocked && "locked")}
        onChange={(!isLocked && onChange) || (() => {})}
        {...props}
      />
      <div onClick={() => setIsLocked(!isLocked)}>
        {isLocked &&
          (typeof lockedIcon === "string" ? (
            <Icon className={cx(styles.icon)} name={lockedIcon as any} />
          ) : (
            lockedIcon
          ))}
        {!isLocked &&
          (typeof unlockedIcon === "string" ? (
            <Icon className={cx(styles.icon)} name={unlockedIcon as any} />
          ) : (
            unlockedIcon
          ))}
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(LockedSlider);
