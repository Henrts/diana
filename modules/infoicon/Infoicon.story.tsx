import React from "react";
import Infoicon from "./Infoicon";
import { ComponentRegistry } from "@diana-ui/base";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import { Avatar } from "@diana-ui/avatar";

Avatar.extendStyles(
  theme => ({
    wrapper: {
      borderColor: theme.colors.grey.greenish,
      borderStyle: "solid",
      boxSizing: "border-box",
      flexShrink: 0,
      height: 48,
      width: 48
    }
  }),
  { register: true }
);

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const InfoiconStory = () => {
  return (
    <Infoicon
      title="title"
      avatarOptions={{
        children: "TXT"
      }}
    >
      Body content
    </Infoicon>
  );
};
