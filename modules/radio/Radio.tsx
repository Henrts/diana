import React, { useCallback, useMemo, ReactElement } from "react";
import uuid from "uuid/v4";
import {
    StandardProps,
    WithStylesProps,
    ThemeStyleSheetFactory,
} from "@diana/types";
import { withStyles } from "@diana/base";

interface IProps extends StandardProps<"input"> {
    children?: ReactElement;
    hasError?: boolean;
    label: string;
    selectedValue?: string;
    value: string;
    onValueSelect?: (value: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
    input: {
        color: theme.colors.primary,
        cursor: "pointer",
        ":hover": {},
        ":active": {},
        "@selectors": {
            "&.checked": {},
            "&.disabled": {
                cursor: "default",
            },
            "&.error": {},
        },
    },
    label: {
        cursor: "pointer",
        ":hover": {},
        ":active": {},
        "@selectors": {
            "&.checked": {},
            "&.disabled": {
                cursor: "default",
            },
            "&.error": {
                color: theme.colors.alert.alert50,
            },
        },
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        "@selectors": {
            "&.checked": {},
            "&.disabled": {},
            "&.error": {
                color: theme.colors.alert.alert50,
            },
        },
    },
});

const Radio: React.FC<IProps & WithStylesProps> = ({
    children,
    cx,
    hasError,
    label,
    selectedValue,
    styles,
    wrappedRef,
    onValueSelect,
    ...props
}) => {
    const id = useMemo(() => uuid(), []);
    const { value, disabled } = props;
    const isChecked = selectedValue === value;

    const handleChange = useCallback(() => {
        if (!disabled && onValueSelect) {
            onValueSelect(value);
        }
    }, [disabled, value, onValueSelect]);

    const inputStyles = cx(
        styles.input,
        isChecked && "checked",
        disabled && "disabled",
        hasError && "error",
        children && children.props.className,
    );

    return (
        <div className={cx(styles.wrapper)}>
            <input
                checked={isChecked}
                className={children ? cx({ display: "none" }) : inputStyles}
                id={id}
                ref={wrappedRef}
                type="radio"
                onChange={handleChange}
                {...props}
            />
            {children &&
                React.cloneElement(children, {
                    className: inputStyles,
                    onClick: handleChange,
                })}
            <label
                htmlFor={id}
                className={cx(
                    styles.label,
                    isChecked && "checked",
                    disabled && "disabled",
                    hasError && "error",
                )}
            >
                {label}
            </label>
        </div>
    );
};

export default withStyles(styleSheet)(Radio);
