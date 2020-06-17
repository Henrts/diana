import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "./";
import { BaseButton } from "@diana-ui/button";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import { typesHighlight } from "../../.storybook/helpers";
import {
  // @ts-ignore
  typesLoaderProps,
  // @ts-ignore
  typesLoaderStyles
} from "./Card";
import {
  // @ts-ignore
  typesLoaderProps as cardHeaderProps,
  // @ts-ignore
  typesLoaderStyles as cardHeaderStyles
} from "./CardHeader";
import {
  // @ts-ignore
  typesLoaderProps as cardBodyProps,
  // @ts-ignore
  typesLoaderStyles as cardBodyStyles
} from "./CardBody";
import {
  // @ts-ignore
  typesLoaderProps as cardFooterProps,
  // @ts-ignore
  typesLoaderStyles as cardFooterStyles
} from "./CardFooter";

const { Props, Styles } = typesHighlight(typesLoaderProps, typesLoaderStyles);
export { Props, Styles };

const { Props: CardHeaderPropsStory, Styles: CardHeaderStylesStory } = typesHighlight(
  cardHeaderProps,
  cardHeaderStyles
);
export { CardHeaderPropsStory, CardHeaderStylesStory };

const { Props: CardBodyPropsStory, Styles: CardBodyStylesStory } = typesHighlight(
  cardBodyProps,
  cardBodyStyles
);
export { CardBodyPropsStory, CardBodyStylesStory };

const { Props: CardFooterPropsStory, Styles: CardFooterStylesStory } = typesHighlight(
  cardFooterProps,
  cardFooterStyles
);
export { CardFooterPropsStory, CardFooterStylesStory };

const CardStylesheet: ThemeStyleSheetFactory = theme => ({
  card: {
    padding: theme.spaceUnit.lg,
    marginBottom: theme.spaceUnit.xs
  }
});

const CardHeaderStylesheet: ThemeStyleSheetFactory = theme => ({
  icon: {
    marginTop: theme.spaceUnit.xs
  },
  label: {
    marginTop: theme.spaceUnit.xs
  }
});

const StyledCard = Card.extendStyles(CardStylesheet);
const StyledCardHeader = CardHeader.extendStyles(CardHeaderStylesheet);

export const CardStory = () => {
  return <StyledCard>Simple card</StyledCard>;
};

export const CardHeaderStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card title" />
    </StyledCard>
  );
};

export const CardHeaderSubtitleStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card with subtitle" subtitle="This is the subtitle" />
    </StyledCard>
  );
};

export const CardHeaderLabelStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card with label" label="Label" />
    </StyledCard>
  );
};

export const CardHeaderIconStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card with icon" icon="check" />
    </StyledCard>
  );
};

export const CardBodyStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card with body" />
      <CardBody>
        <p>This is the card body</p>
        <p>Some content goes here</p>
      </CardBody>
    </StyledCard>
  );
};

export const CardFooterStory = () => {
  return (
    <StyledCard>
      <StyledCardHeader title="Card with footer" />
      <CardFooter>
        <BaseButton>Some action {">"}</BaseButton>
      </CardFooter>
    </StyledCard>
  );
};
