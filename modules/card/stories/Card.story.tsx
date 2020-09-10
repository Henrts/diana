import React from "react";
import { BaseButton } from "@diana-ui/button";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import Card, { Card as C } from "../src/Card";
import CardBody, { CardBody as CB } from "../src/CardBody";
import CardHeader, { CardHeader as CH } from "../src/CardHeader";
import CardFooter, { CardFooter as CF } from "../src/CardFooter";

export default {
  title: "Components/Card",
  component: C,
  subcomponents: { CardHeader: CH, CardBody: CB, CardFooter: CF }
};

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

export const CardHeaderStory = props => {
  return (
    <StyledCard>
      <StyledCardHeader {...props} />
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
