import React from "react";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import Avatar, { Avatar as BaseAvatar } from "../src/Avatar";
import ImageAvatar, { ImageAvatar as BaseImageAvatar } from "../src/ImageAvatar";

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

export default {
  title: "Components/Avatar",
  component: BaseAvatar,
  subcomponents: { ImageAvatar: BaseImageAvatar }
};

export const StyledAvatar = Avatar.extendStyles(stylesheet);
export const StyledImageAvatar = ImageAvatar.extendStyles(stylesheet);
