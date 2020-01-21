import React, { useState, forwardRef, useRef, useEffect, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "../../base";
import { ThemeStyleSheetFactory, StandardProps, WithStylesProps } from "../../types";

const stylesheet: ThemeStyleSheetFactory = theme => ({
    fieldset: {
        position: "relative",
        height: 38,
        display: "flex",
        padding: "2px 8px"
    },
    fieldsetError: {
        borderColor: theme.colors.alert.alert100
    },
    input: {
        outline: "none",
        border: "none",
        fontFamily: theme.fontFamily,
        width: "100%",
        fontSize: 18, /* TODO change this to typography */
        height: 35,
        flex: 1
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
        ...theme.fonts.label,
        color: "#808080",
        padding: "0px 4px",
        transition: "transform 0.1s, font-size 0.1s",
        transitionTimingFunction: "ease-in",
        pointerEvents: "none"
    },
    labelActive: {
        transform: "translate(2px, -20px)",
        fontSize: "12px"
    },
    labelFocus: {
        transform: "translate(2px, -20px)",
        fontSize: "12px"
    },
    hiddenLabel: {
        fontSize: "12px", /* TODO change this to typography */
        opacity: "0",
        position: "absolute",
        pointerEvents: "none",
        height: "0"
    },
    legend: {
        width: "0",
        pointerEvents: "none",
        padding: "0px",
        ...theme.fonts.label,
        textAlign: "left",
        opacity: 0,
        transition: "width 0.15s",
        lineHeight: "11px",
        height: 0
    },
    legendActive: {
        padding: "0 2px"
    },
    legendFocus: {
        padding: "0 2px"
    }

})
export interface ITextInputProps extends StandardProps<"input"> {
    label?: string;
    hasError?: boolean;
}
export const TextInput: React.FC<PropsWithChildren<ITextInputProps & WithStylesProps>> = (({ styles, wrappedRef, cx, hasError, label, onChange, disabled, ...props }) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [legendWidth, setLegendWidth] = useState(0);
    const hiddenLabel: any = useRef(null);

    useEffect(() => {
        const labelNode: any = ReactDOM.findDOMNode(hiddenLabel.current);
        setLegendWidth(labelNode != null ? labelNode.offsetWidth : 0);
    }, [hiddenLabel]);
    
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <fieldset className={cx(styles.fieldset, isFocused && styles.fieldsetFocus, hasError && styles.fieldsetError, disabled && styles.fieldsetDisabled)}>
            <legend className={cx(styles.legend, isFocused && label && styles.legendFocus, hasContent && label && styles.legendActive,
            isFocused && {
                width: legendWidth
            }, hasContent && {
                width: legendWidth
            }, disabled && styles.legendDisabled)}>{label}</legend>
            {label && <span ref={hiddenLabel} className={cx(styles.hiddenLabel)}>{label}</span>}
            {label && <div className={cx(styles.labelContainer)}>
                <span className={cx(styles.label,
                    isFocused && styles.labelFocus,
                    hasContent && styles.labelActive,
                    hasError && styles.legendError,
                    disabled && styles.legendDisabled)}>
                        {label}
                    </span>
            </div>}
            <input {...props} disabled={disabled} ref={inputRef} className={cx(styles.input)} 
            onChange={(e): void=> {
                if(onChange) {
                    onChange(e);
                }
                setHasContent(e.target.value.length > 0)
            }} onBlur={(): void => setIsFocused(false)} onFocus={(): void => setIsFocused(true)} />
        </fieldset>
    )
})
export default withStyles(stylesheet)(TextInput);
