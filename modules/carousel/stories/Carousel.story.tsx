import React from "react";
import Carousel from "../src/Carousel";

export default {
  title: "Components/Carousel",
  components: Carousel
};

export const CarouselStory = () => {
  return (
    <Carousel>
      {[{ name: "test" }, { name: "test2" }].map(item => (
        <div>{item.name}</div>
      ))}
    </Carousel>
  );
};
