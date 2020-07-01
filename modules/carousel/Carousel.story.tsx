import React, { useState } from "react";
import Carousel, {
  // @ts-ignore
  typesLoaderProps as CarouselPropTypes,
  // @ts-ignore
  typesLoaderStyles as CarouselStyleTypes
} from "./Carousel";
import { typesHighlight } from "../../.storybook/helpers";

const { Props: CarouselProps, Styles: CarouselStyles } = typesHighlight(
  CarouselPropTypes,
  CarouselStyleTypes
);
export { CarouselProps, CarouselStyles };

export const CarouselStory = () => {
  return (
    <Carousel>
      {[{ name: "test" }, { name: "test2" }].map(item => (
        <div>{item.name}</div>
      ))}
    </Carousel>
  );
};
