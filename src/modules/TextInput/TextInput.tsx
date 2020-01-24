import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import { withStyles } from "../../base";
import {
  ThemeStyleSheetFactory,
  StandardProps,
  WithStylesProps
} from "../../types";

const stylesheet: ThemeStyleSheetFactory = theme => ({
  fieldset: {
    position: "relative",
    height: 38,
    display: "flex",
    padding: "2px 8px",
    "@selectors": {
      "&.error": {
        borderColor: theme.colors.alert.alert100
      },
      "&.disabled": {
        backgroundColor: "#eee"
      },
      "&.focus": {}
    }
  },
  input: {
    outline: "none",
    border: "none",
    width: "100%",
    height: 35,
    flex: 1,
    ...theme.typography.body,
    "@selectors": {
      "&.disabled": {
        backgroundColor: "#eee"
      }
    }
  },
  labelContainer: {
    position: "absolute",
    top: "0px",
    left: "4px",
    height: "40px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center"
  },
  label: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#808080",
    padding: "0px 4px",
    transition: "transform 0.1s, font-size 0.1s",
    transitionTimingFunction: "ease-in",
    pointerEvents: "none",
    ...theme.typography.body,
    "@selectors": {
      "&.active,&.focus": {
        transform: "translate(2px, -21px)",
        ...theme.typography.label
      }
    }
  },
  hiddenLabel: {
    opacity: "0",
    position: "absolute",
    pointerEvents: "none",
    height: "0",
    ...theme.typography.label
  },
  legend: {
    width: "0",
    pointerEvents: "none",
    padding: "0",
    textAlign: "left",
    opacity: 0,
    transition: "width 0.15s",
    lineHeight: "11px",
    height: 0,
    "@selectors": {
      "&.active,&.focus": {
        padding: "0 2px"
      }
    }
  }
});
export interface ITextInputProps extends StandardProps<"input"> {
  label?: string;
  hasError?: boolean;
}
export const TextInput: React.FC<PropsWithChildren<
  ITextInputProps & WithStylesProps
>> = ({
  styles,
  wrappedRef,
  cx,
  className,
  hasError,
  label,
  onChange,
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [legendWidth, setLegendWidth] = useState(0);
  const hiddenLabel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const labelNode = hiddenLabel.current;
    setLegendWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, [hiddenLabel]);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <fieldset
      className={cx(
        styles.fieldset,
        isFocused && "focus",
        hasContent && "active",
        hasError && "error",
        disabled && "disabled",
        className
      )}
    >
      <legend
        className={cx(
          styles.legend,
          isFocused && label && "focus",
          hasContent && label && "active",
          (isFocused || hasContent) && {
            width: legendWidth
          },
          disabled && "disabled"
        )}
      >
        {label}
      </legend>
      {label && (
        <span ref={hiddenLabel} className={cx(styles.hiddenLabel)}>
          {label}
        </span>
      )}
      {label && (
        <div className={cx(styles.labelContainer)}>
          <span
            className={cx(
              styles.label,
              isFocused && "focus",
              hasContent && "active",
              hasError && "error",
              disabled && "disabled"
            )}
          >
            {label}
          </span>
        </div>
      )}
      <input
        {...props}
        disabled={disabled}
        ref={inputRef}
        className={cx(styles.input, disabled && "disabled")}
        onChange={(e): void => {
          if (onChange) {
            onChange(e);
          }
          setHasContent(e.target.value.length > 0);
        }}
        onBlur={(): void => setIsFocused(false)}
        onFocus={(): void => setIsFocused(true)}
      />
    </fieldset>
  );
};
export default withStyles(stylesheet)(TextInput);
