import React, { useState } from "react";
import Carousel from "./Carousel";
import { ThemeStyleSheetFactory } from "@diana-ui/types";

const stylesheet: ThemeStyleSheetFactory = theme => ({});

export const CarouselStory = () => {
  return (
    <Carousel items={[{ name: "test" }, { name: "test2" }]}>
      {item => <div>{item.name}</div>}
    </Carousel>
  );
};
