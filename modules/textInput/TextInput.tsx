import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import { withStyles } from "@diana-ui/base";
import {
  ThemeStyleSheetFactory,
  StandardProps,
  WithStylesProps
} from "@diana-ui/types";
import { useRegistry } from "@diana-ui/hooks";
import { IIconProps } from "@diana-ui/icon";

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
        backgroundColor: theme.colors.grey.grey25
      },
      "&.focus": {}
    }
  },
  inputContainer: {
    display: "flex",
    alignItems: "center"
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
        backgroundColor: theme.colors.grey.grey25
      }
    }
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    left: theme.spaceUnit.xxs,
    height: 40,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center"
  },
  label: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.colors.grey.grey100,
    padding: `0 ${theme.spaceUnit.xxs}px`,
    transition: "transform 0.1s, font-size 0.1s, padding 0.1s",
    transitionTimingFunction: "ease-in",
    pointerEvents: "none",
    ...theme.typography.body,
    "@selectors": {
      "&.active,&.focus": {
        transform: "translate(2px, -21px)",
        paddingLeft: theme.spaceUnit.xxs,
        ...theme.typography.label
      }
    }
  },
  labelWithPrefix: {
    paddingLeft: theme.spaceUnit.xl
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
  },
  prefixIcon: {
    marginRight: theme.spaceUnit.xs
  },
  suffixIcon: {
    marginLeft: theme.spaceUnit.xs
  }
});

export interface IProps extends StandardProps<"input"> {
  label?: string;
  hasError?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
}
export const TextInput: React.FC<PropsWithChildren<
  IProps & WithStylesProps
>> = ({
  styles,
  wrappedRef,
  cx,
  className,
  hasError,
  label = "",
  onChange,
  disabled,
  prefixIcon,
  suffixIcon,
  parentStylesheet,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [legendWidth, setLegendWidth] = useState(0);
  const hiddenLabel = useRef<HTMLSpanElement>(null);
  const Icon = useRegistry<IIconProps>("Icon");

  useEffect(() => {
    const length = props.value?.toString()?.length || 0;
    setHasContent(length > 0);
  }, [props.value]);

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
      <span ref={hiddenLabel} className={cx(styles.hiddenLabel)}>
        {label}
      </span>
      <div className={cx(styles.labelContainer)}>
        <span
          className={cx(
            styles.label,
            prefixIcon && styles.labelWithPrefix,
            isFocused && "focus",
            hasContent && "active",
            hasError && "error",
            disabled && "disabled"
          )}
        >
          {label}
        </span>
      </div>
      <div className={cx(styles.inputContainer)}>
        {prefixIcon && (
          <Icon
            name={prefixIcon as any}
            size={16}
            className={cx(styles.prefixIcon)}
          />
        )}
        <input
          {...props}
          disabled={disabled}
          ref={inputRef}
          className={cx(styles.input, disabled && "disabled")}
          onChange={e => {
            if (onChange) {
              onChange(e);
            }
            setHasContent(e.target.value.length > 0);
          }}
          onBlur={e => {
            setIsFocused(false);
            return props.onBlur?.(e);
          }}
          onFocus={e => {
            setIsFocused(true);
            return props.onFocus?.(e);
          }}
        />
        {suffixIcon && (
          <Icon
            name={suffixIcon as any}
            size={16}
            className={cx(styles.suffixIcon)}
          />
        )}
      </div>
    </fieldset>
  );
};
export default withStyles(stylesheet)(TextInput);
