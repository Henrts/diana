import React, { useState } from "react";
import Sidebar, {
// @ts-ignore
  typesLoaderProps as SidebarPropTypes,
// @ts-ignore
  typesLoaderStyles as SidebarStyleTypes
} from "./Sidebar";
import { typesHighlight } from "../../.storybook/helpers";

const { Props: SidebarProps, Styles: SidebarStyles } = typesHighlight(
  SidebarPropTypes,
  SidebarStyleTypes
);
export { SidebarProps, SidebarStyles };

const modes = ["side", "over"];
export const SidebarStory = () => {
  const [direction, setDirection] = useState("left");
  const [animate, setAnimate] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [mode, setMode] = useState(0);

  return (
    <div
      style={{
        width: 600,
        height: 300,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
        display: "flex",
        color: "white"
      }}
    >
      {direction === "left" && (
        <Sidebar
          open={isOpen}
          mode={modes[mode] as any}
          hasOverlay={overlay}
          animate={animate}
          direction={direction as any}
          onClose={() => setIsOpen(false)}
        >
          <div style={{ width: 200, backgroundColor: "red", height: "100%" }}>sidebar here</div>
        </Sidebar>
      )}

      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        <div style={{ textAlign: "right" }}>
          <button onClick={() => setIsOpen(true)}>Open</button>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button onClick={() => setAnimate(!animate)}>
            Animate: {animate ? "true" : "false"}
          </button>
          <button onClick={() => setMode((mode + 1) % modes.length)}>mode: {modes[mode]}</button>
          <button onClick={() => setOverlay(!overlay)}>
            overlay: {overlay ? "true" : "false"}
          </button>
          <button onClick={() => setDirection(direction === "left" ? "right" : "left")}>
            direction: {direction}
          </button>
        </div>
      </div>

      {direction === "right" && (
        <Sidebar
          open={isOpen}
          mode={modes[mode] as any}
          hasOverlay={overlay}
          animate={animate}
          direction={direction as any}
          onClose={() => setIsOpen(false)}
        >
          <div style={{ width: 200, backgroundColor: "red", height: "100%" }}>sidebar here</div>
        </Sidebar>
      )}
    </div>
  );
};
