import React from "react";
import Infoicon from "./Infoicon";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const InfoiconStory = () => {
  return <Infoicon title="title" />;
};
