import React, { useState } from "react";
import { Avatar, ImageAvatar } from "./";
import { ThemeStyleSheetFactory, Theme } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({
  wrapper: {
    borderColor: theme.colors.grey.greenish,
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
