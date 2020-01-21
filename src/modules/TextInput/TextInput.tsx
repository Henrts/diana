import React, { useState, forwardRef, useRef, useEffect } from "react";
import { useStyles } from "../../base";
import ReactDOM from 'react-dom';
import { ThemeStyleSheetFactory } from "../../types";

const stylesheet: ThemeStyleSheetFactory = (theme) => ({
    fieldset: {
        borderRadius: "5px",
        border: "1px solid #ccc",
        position: "relative",
        height: 38,
        display: "flex",
        padding: "2px 8px",
        ":hover": {
            borderColor: "black"
        }
    },
    fieldsetFocus: {
        borderColor: "black"
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
        flex: 1,
    },
    label: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        position: "absolute",
        fontFamily: theme.fontFamily,
        top: "13px",
        left: "8px",
        color: "#808080",
        padding: "0px 4px",
        transition: "transform 0.1s, font-size 0.1s",
        transitionTimingFunction: "ease-in",
        pointerEvents: "none"
    },
    labelActive: {
        transform: "translate(0px, -20px)",
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
        fontFamily: theme.fontFamily,
        textAlign: "left", 
        opacity: 0,
        transition: "width 0.1s",
        lineHeight: "11px",
        height: 0
    },
    legendActive: {
        padding: "0 4px"                    
    },
    error: {
        borderColor: theme.colors.alert.alert100
    },
    errorLabel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontSize: "12px", /* TODO change this to typography */
        color: theme.colors.alert.alert100,
        fontFamily: theme.fontFamily
    }
})
interface IProps {
    label?: string;
    error?: string | boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, IProps>(({ label, onChange, error }, ref) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [legendWidth, setLegendWidth] = useState(0);
    const hiddenLabel: any = useRef(null);
    const [styles, cx] = useStyles(stylesheet);

    useEffect(() => {
        const labelNode: any = ReactDOM.findDOMNode(hiddenLabel.current);
        setLegendWidth(labelNode != null ? labelNode.offsetWidth : 0);
    }, [hiddenLabel]);
    return (
        <div >
            <fieldset className={cx(styles.fieldset, isFocused && styles.fieldsetFocus, error && styles.fieldsetError)}>
                <legend className={cx(styles.legend, (isFocused || hasContent) && label && styles.legendActive, (isFocused || hasContent) && {
                    width: legendWidth
                })}>{label}</legend>
                {label && <span ref={hiddenLabel} className={cx(styles.hiddenLabel)}>{label}</span>}
                {label && <span className={cx(styles.label, (isFocused || hasContent) && styles.labelActive )}>{label}</span>}
                <input ref={ref} className={cx(styles.input)} 
                onChange={(e): void=> {
                    if(onChange) {
                        onChange(e);
                    }
                    setHasContent(e.target.value.length > 0)
                }} onBlur={(): void => setIsFocused(false)} onFocus={(): void => setIsFocused(true)} />
            </fieldset>
            {error && typeof error === "string" && <div className={cx(styles.errorLabel)}>{error}</div>}
        </div>
    )
})
export default TextInput;