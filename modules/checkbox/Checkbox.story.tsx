import React, { useCallback, useEffect, useRef, useState } from "react";
import Checkbox, { ICheckboxRef } from "./Checkbox";
import { Icon } from "@diana/icon";

export const CheckboxStory1 = () => {
    const ref = useRef<ICheckboxRef>(null);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Checkbox checked readOnly>
                Checked
            </Checkbox>
            <Checkbox checked={false} readOnly>
                Unchecked
            </Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
            <Checkbox disabled checked readOnly>
                Disabled checked
            </Checkbox>
        </div>
    );
};

const CustomCheckbox = Checkbox.extendStyles(() => ({
    container: {
        "@selectors": {
            ":hover .icon:not(.disabled):not(.checked):not(.show-as-checked)": {
                stroke: "pink",
                backgroundColor: "steelblue",
            },
        },
    },
    iconContainer: {
        "@selectors": {
            "&.checked": {
                backgroundColor: "white",
            },
        },
    },
    icon: {
        fill: "none",
        "@selectors": {
            "&.checked": {
                opacity: 1,
                fill: "none",
                stroke: "red",
            },
        },
    },
}));

export const CheckboxStory2 = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <Checkbox checkedIcon={<Icon name="add" />}>
                Custom Checked Icon
            </Checkbox>
            <CustomCheckbox checkedIcon={<Icon name="arrow" stroke={"red"} />}>
                Colored Checked Icon
            </CustomCheckbox>
            <CustomCheckbox
                checkedIcon={
                    <div
                        style={{
                            height: "100%",
                            width: "3px",
                            backgroundColor: "blue",
                        }}
                    />
                }
            >
                Different Checked Icon
            </CustomCheckbox>
        </div>
    );
};

export const CheckboxStory3 = () => {
    const ref = useRef<ICheckboxRef>(null);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <Checkbox wrappedRef={ref}>Default</Checkbox>
            <button
                onClick={() => {
                    ref?.current?.toggle();
                }}
            >
                TOGGLE CHECKBOX
            </button>
        </div>
    );
};
