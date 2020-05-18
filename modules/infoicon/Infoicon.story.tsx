import React from "react";
// @ts-ignore
import Infoicon, { typesLoaderProps, typesLoaderStyles } from "./Infoicon";
import { Avatar } from "@diana-ui/avatar";
import { DescriptionMedium } from "@diana-ui/typography";
import { typesHighlight } from "../../.storybook/helpers";

const { Props, Styles } = typesHighlight(typesLoaderProps, typesLoaderStyles);
export { Props, Styles };

Avatar.extendStyles(
  theme => ({
    wrapper: {
      borderColor: theme.colors.grey.grey25,
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
