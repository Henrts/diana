import React, { useState } from "react";
import { Avatar, ImageAvatar } from "./";
import {
  // @ts-ignore
  typesLoaderProps as AvatarPropTypes,
  // @ts-ignore
  typesLoaderStyles as AvatarStyleTypes
} from "./Avatar";
import {
  // @ts-ignore
  typesLoaderProps as ImageAvatarPropTypes,
  // @ts-ignore
  typesLoaderStyles as ImageAvatarStyleTypes
} from "./ImageAvatar";
import { ThemeStyleSheetFactory, Theme } from "@diana-ui/types";
import { typesHighlight } from "../../.storybook/helpers";

const { Props: AvatarProps, Styles: AvatarStyles } = typesHighlight(
  AvatarPropTypes,
  AvatarStyleTypes
);
export { AvatarProps, AvatarStyles };

const { Props: ImageAvatarProps, Styles: ImageAvatarStyles } = typesHighlight(
  ImageAvatarPropTypes,
  ImageAvatarStyleTypes
);
export { ImageAvatarProps, ImageAvatarStyles };

const stylesheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    borderColor: theme.colors.grey.grey25,
    borderStyle: "solid",
    boxSizing: "border-box",
    flexShrink: 0,
    height: 48,
    width: 48
  }
});

const StyledAvatar = Avatar.extendStyles(stylesheet);
const StyledImageAvatar = ImageAvatar.extendStyles(stylesheet);

export const AvatarStory = () => {
  return <StyledAvatar>TXT</StyledAvatar>;
};

export const ImageAvatarStory = () => {
  return (
    <StyledImageAvatar
      src="https://cdn.worldvectorlogo.com/logos/carlsberg-6.svg"
      alt="carsberg beer"
      backgroundColor="#3f9e59"
    />
  );
};
