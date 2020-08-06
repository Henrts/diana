import React from "react";
import Toggle, {
  // @ts-ignore
  typesLoaderProps as TogglePropTypes,
  // @ts-ignore
  typesLoaderStyles as ToggleStyleTypes
} from "./Toggle";
import { typesHighlight } from "../../.storybook/helpers";

const { Props: ToggleProps, Styles: ToggleStyles } = typesHighlight(
  TogglePropTypes,
  ToggleStyleTypes
);
export { ToggleProps, ToggleStyles };

export const ToggleStory = () => {
  return <Toggle onChange={e => console.log("onChange fired", e.target.value)} />;
};

export const ToggleStoryDisabled = () => {
  return <Toggle disabled />;
};

export const ToggleStoryLabel = () => {
  return <Toggle>Label</Toggle>;
};
