import React from "react";
import Infoicon from "./Infoicon";
import { Avatar } from "@diana-ui/avatar";
import { DescriptionMedium } from "@diana-ui/typography";

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

export const CustomTitleInfoiconStory = () => {
  return (
    <Infoicon
      title={<DescriptionMedium>Custom title</DescriptionMedium>}
      avatarOptions={{
        children: "TXT"
      }}
    >
      Body content
    </Infoicon>
  );
};
